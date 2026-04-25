import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getDiagnosisResultById } from "../services/diagnosisRepository";

const INPUT_LABELS = {
  gender: "Gender",
  age: "Age",
  hasHypertension: "Hypertension",
  hasHeartDisease: "Heart Disease",
  everMarried: "Ever Married",
  workType: "Work Type",
  residenceType: "Residence Type",
  avgGlucoseLevel: "Average Glucose Level",
  bmi: "BMI",
  smokingStatus: "Smoking Status",
};

const formatInputValue = (value) => {
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (value === null || value === undefined || value === "") return "Not provided";
  return String(value);
};

export default function DiagnosticRequestDetailsScreen() {
  const { resultId } = useLocalSearchParams();
  const normalizedResultId = Array.isArray(resultId) ? resultId[0] : resultId;
  const [record, setRecord] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadRecord = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");
        const loaded = await getDiagnosisResultById(normalizedResultId);
        if (isMounted) setRecord(loaded);
      } catch (error) {
        if (isMounted) {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "Unable to load diagnostic request details."
          );
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadRecord();
    return () => {
      isMounted = false;
    };
  }, [normalizedResultId]);

  const inputRows = useMemo(() => {
    const inputs = record?.inputs;
    if (!inputs || typeof inputs !== "object") return [];

    return Object.entries(INPUT_LABELS).map(([key, label]) => ({
      key,
      label,
      value: formatInputValue(inputs[key]),
    }));
  }, [record]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Diagnostic Request Details</Text>

      {isLoading ? (
        <ActivityIndicator color="#00796B" style={{ marginVertical: 24 }} />
      ) : errorMessage ? (
        <View style={styles.errorCard}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : !record ? (
        <View style={styles.errorCard}>
          <Text style={styles.errorText}>No record found for this request.</Text>
        </View>
      ) : (
        <>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Request ID</Text>
            <Text style={styles.summaryValue}>{record.requestId || "Unavailable"}</Text>
            <Text style={styles.summaryMeta}>
              {record.requestedAt
                ? new Date(record.requestedAt).toLocaleString()
                : "Unknown timestamp"}
            </Text>
            <Text style={styles.summaryMeta}>
              At risk: {(Number(record.atRisk || 0) * 100).toFixed(1)}% | Not at risk:{" "}
              {(Number(record.notAtRisk || 0) * 100).toFixed(1)}%
            </Text>
          </View>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Submitted Inputs</Text>
            {inputRows.length === 0 ? (
              <Text style={styles.emptyText}>
                Inputs were not saved for this older request.
              </Text>
            ) : (
              inputRows.map((row) => (
                <View key={row.key} style={styles.row}>
                  <Text style={styles.rowLabel}>{row.label}</Text>
                  <Text style={styles.rowValue}>{row.value}</Text>
                </View>
              ))
            )}
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 20,
    paddingTop: 24,
    paddingBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 16,
  },
  summaryCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryLabel: {
    fontSize: 12,
    color: "#777",
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#00796B",
    marginBottom: 8,
  },
  summaryMeta: {
    fontSize: 13,
    color: "#555",
    marginBottom: 2,
  },
  sectionCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#00796B",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    paddingVertical: 10,
    gap: 12,
  },
  rowLabel: {
    flex: 1,
    fontSize: 14,
    color: "#444",
  },
  rowValue: {
    flex: 1,
    fontSize: 14,
    color: "#111",
    textAlign: "right",
    fontWeight: "600",
  },
  emptyText: {
    color: "#999",
    fontSize: 14,
    lineHeight: 20,
  },
  errorCard: {
    backgroundColor: "#FFEBEE",
    borderRadius: 12,
    padding: 16,
  },
  errorText: {
    color: "#C62828",
    fontSize: 14,
  },
};
