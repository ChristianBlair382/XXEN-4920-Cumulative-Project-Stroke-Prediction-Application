from __future__ import annotations

from pathlib import Path
from typing import List

import torch
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from torch import nn


MODEL_PATH = Path(__file__).resolve().parents[1] / "Baseline_Model.pth"
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


def load_checkpoint(path: Path):
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


@app.post("/run_diagnostic")
def run_diagnostic(payload: DiagnosticRequest) -> dict:
    if len(payload.features) != EXPECTED_FEATURES:
        raise HTTPException(
            status_code=400,
            detail=f"Expected {EXPECTED_FEATURES} features, got {len(payload.features)}.",
        )

    with torch.no_grad():
        tensor = torch.tensor([payload.features], dtype=torch.float32)
        output = MODEL(tensor).squeeze(0).tolist()

    not_at_risk = float(output[0])
    at_risk = float(output[1])

    return {
        "not_at_risk": not_at_risk,
        "at_risk": at_risk,
        "raw": output,
    }
