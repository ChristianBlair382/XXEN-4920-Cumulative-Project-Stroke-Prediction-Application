import {
  get,
  orderByChild,
  limitToLast,
  push,
  query,
  ref,
  set,
} from "firebase/database";
import { getFirebaseDatabase, initializeFirebase } from "./firebaseConfig";

const DEFAULT_USER_ID = "default-user";

let inMemoryLastDiagnosis = null;

const normalizeRecord = (record, userId) => {
  if (!record) return null;

  const notAtRisk = Number(record.notAtRisk ?? record.not_at_risk ?? 0);
  const atRisk = Number(record.atRisk ?? record.at_risk ?? 0);

  return {
    id: record.id ?? null,
    userId: record.userId ?? userId,
    notAtRisk,
    atRisk,
    requestedAt: record.requestedAt ?? record.requested_at ?? new Date().toISOString(),
  };
};

export const initializeDiagnosisRepository = async () => {
  initializeFirebase();
};

export const saveLastDiagnosisResult = async ({
  userId = DEFAULT_USER_ID,
  notAtRisk,
  atRisk,
  requestedAt = new Date().toISOString(),
}) => {
  const normalized = normalizeRecord(
    {
      userId,
      notAtRisk,
      atRisk,
      requestedAt,
    },
    userId
  );

  inMemoryLastDiagnosis = normalized;

  const database = getFirebaseDatabase();

  if (!database) {
    return normalized;
  }

  const resultsRef = ref(database, `users/${userId}/diagnosisResults`);
  const newResultRef = push(resultsRef);

  await set(newResultRef, {
    notAtRisk: normalized.notAtRisk,
    atRisk: normalized.atRisk,
    requestedAt: normalized.requestedAt,
  });

  normalized.id = newResultRef.key;

  return normalized;
};

export const getLastDiagnosisResult = async (userId = DEFAULT_USER_ID) => {
  const database = getFirebaseDatabase();

  if (database) {
    const resultsRef = ref(database, `users/${userId}/diagnosisResults`);
    const latestResultQuery = query(
      resultsRef,
      orderByChild("requestedAt"),
      limitToLast(1)
    );

    const snapshot = await get(latestResultQuery);

    if (snapshot.exists()) {
      const resultsMap = snapshot.val();
      const [latestResultId] = Object.keys(resultsMap);
      const latestResult = resultsMap[latestResultId];

      const normalized = normalizeRecord(
        {
          id: latestResultId,
          userId,
          ...latestResult,
        },
        userId
      );

      inMemoryLastDiagnosis = normalized;

      return normalized;
    }
  }

  if (!inMemoryLastDiagnosis || inMemoryLastDiagnosis.userId !== userId) {
    return null;
  }

  return inMemoryLastDiagnosis;
};

export const formatRiskStatus = (record) => {
  if (!record) return "Not Calculated";

  const atRiskPercent = Number(record.atRisk) * 100;

  if (atRiskPercent >= 70) return "High Risk";
  if (atRiskPercent >= 40) return "Moderate Risk";

  return "Low Risk";
};
