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
  // SQLite setup placeholder for future implementation.
  // Example (when DB is added):
  // 1. Open DB
  // 2. CREATE TABLE IF NOT EXISTS diagnosis_results (...)
  // 3. Add indexes on (user_id, requested_at)
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

  // SQLite insert placeholder for future implementation.
  // Example SQL:
  // INSERT INTO diagnosis_results (user_id, not_at_risk, at_risk, requested_at)
  // VALUES (?, ?, ?, ?)

  return normalized;
};

export const getLastDiagnosisResult = async (userId = DEFAULT_USER_ID) => {
  // SQLite query placeholder for future implementation.
  // Example SQL:
  // SELECT id, user_id AS userId, not_at_risk AS notAtRisk, at_risk AS atRisk, requested_at AS requestedAt
  // FROM diagnosis_results
  // WHERE user_id = ?
  // ORDER BY datetime(requested_at) DESC
  // LIMIT 1

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
