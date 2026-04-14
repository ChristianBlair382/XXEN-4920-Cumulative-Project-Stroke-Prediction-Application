import { collection, addDoc, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db, auth } from "./firebaseConfig";

// Save a diagnosis result to Firestore under the logged-in user's collection
export const saveLastDiagnosisResult = async ({ notAtRisk, atRisk, requestedAt = new Date().toISOString() }) => {
  const userId = auth.currentUser?.uid;
  if (!userId) throw new Error("User not logged in.");

  const record = { notAtRisk, atRisk, requestedAt, userId };

  const docRef = await addDoc(collection(db, "users", userId, "diagnosisResults"), record);

  return { id: docRef.id, ...record };
};

// Get the most recent diagnosis result for the logged-in user
export const getLastDiagnosisResult = async () => {
  const userId = auth.currentUser?.uid;
  if (!userId) return null;

  const q = query(
    collection(db, "users", userId, "diagnosisResults"),
    orderBy("requestedAt", "desc"),
    limit(1)
  );

  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() };
};

// Get ALL diagnosis results for the logged-in user
export const getAllDiagnosisResults = async () => {
  const userId = auth.currentUser?.uid;
  if (!userId) return [];

  const q = query(
    collection(db, "users", userId, "diagnosisResults"),
    orderBy("requestedAt", "desc")
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// No-op kept for compatibility
export const initializeDiagnosisRepository = async () => {};

export const formatRiskStatus = (record) => {
  if (!record) return "Not Calculated";
  const atRiskPercent = Number(record.atRisk) * 100;
  if (atRiskPercent >= 70) return "High Risk";
  if (atRiskPercent >= 40) return "Moderate Risk";
  return "Low Risk";
};