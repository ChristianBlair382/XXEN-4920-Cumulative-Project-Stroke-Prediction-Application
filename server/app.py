from __future__ import annotations

import logging
from pathlib import Path
import sys
from typing import List
from uuid import uuid4

import torch
from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
from torch import nn


MODEL_PATH = Path(__file__).resolve().parents[1] / "ReLU_Model.pth"
EXPECTED_FEATURES = 21


class Classifier(nn.Module):
    def __init__(self) -> None:
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(21, 40),
            nn.ReLU(),
            nn.Linear(40, 25),
            nn.ReLU(),
            nn.Linear(25, 10),
            nn.ReLU(),
            nn.Linear(10, 2),
            nn.Sigmoid(),
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return self.net(x)


class DiagnosticRequest(BaseModel):
    features: List[float]


app = FastAPI()
logger = logging.getLogger("stroke_predictor_api")
if not logger.handlers:
    logging.basicConfig(level=logging.INFO)


def load_checkpoint(path: Path):
    main_module = sys.modules.get("__main__")
    if main_module is not None and not hasattr(main_module, "Classifier"):
      setattr(main_module, "Classifier", Classifier)

    try:
        return torch.load(path, map_location="cpu", weights_only=False)
    except TypeError:
        return torch.load(path, map_location="cpu")


def load_model() -> nn.Module:
    try:
        model = load_checkpoint(MODEL_PATH)
        model.eval()
        return model
    except Exception:
        model = Classifier()
        state = load_checkpoint(MODEL_PATH)
        if isinstance(state, dict):
            model.load_state_dict(state)
        model.eval()
        return model


MODEL = load_model()


@app.middleware("http")
async def request_id_middleware(request: Request, call_next):
    request_id = request.headers.get("X-Request-Id") or str(uuid4())
    request.state.request_id = request_id
    response = await call_next(request)
    response.headers["X-Request-Id"] = request_id
    return response


@app.post("/run_diagnostic")
def run_diagnostic(payload: DiagnosticRequest, request: Request) -> dict:
    request_id = getattr(request.state, "request_id", str(uuid4()))
    logger.info("run_diagnostic request_id=%s feature_count=%s", request_id, len(payload.features))

    if len(payload.features) != EXPECTED_FEATURES:
        raise HTTPException(
            status_code=400,
            detail=f"Expected {EXPECTED_FEATURES} features, got {len(payload.features)}.",
        )

    with torch.no_grad():
        tensor = torch.tensor([payload.features], dtype=torch.float32)
        raw_output = MODEL(tensor).squeeze(0)

        if raw_output.ndim != 1:
            raw_output = raw_output.flatten()

        if raw_output.numel() == 2:
            probabilities = torch.softmax(raw_output, dim=0)
        elif raw_output.numel() == 1:
            at_risk_prob = torch.sigmoid(raw_output[0])
            probabilities = torch.stack((1.0 - at_risk_prob, at_risk_prob))
        else:
            raise HTTPException(
                status_code=500,
                detail=f"Model returned {raw_output.numel()} outputs; expected 1 or 2.",
            )

    output = probabilities.tolist()

    not_at_risk = float(output[0])
    at_risk = float(output[1])

    return {
        "request_id": request_id,
        "not_at_risk": not_at_risk,
        "at_risk": at_risk,
        "raw": output,
    }
