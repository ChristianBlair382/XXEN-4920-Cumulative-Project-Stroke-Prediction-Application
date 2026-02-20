import { Text, View, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";

export default function DiagnosticScreen() {
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [cholesterol, setCholesterol] = useState("");
  const [bloodSugar, setBloodSugar] = useState("");
  const [bmi, setBmi] = useState("");
  const [smokingStatus, setSmokingStatus] = useState("");
  const [diagnosticResult, setDiagnosticResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = "http://localhost:8000/run_diagnostic";

  const toNumber = (value) => {
    const parsed = parseFloat(value);
    return Number.isNaN(parsed) ? 0 : parsed;
  };

  const buildFeatureVector = () => {
    const features = new Array(21).fill(0);

    features[0] = toNumber(age);
    features[1] = hasHypertension ? 1 : 0;
    features[2] = hasHeartDisease ? 1 : 0;
    features[3] = toNumber(avgGlucoseLevel);
    features[4] = toNumber(bmi);

    const genderNormalized = gender.trim().toLowerCase();
    if (genderNormalized === "male") features[5] = 1;
    if (genderNormalized === "female") features[6] = 1;
    if (genderNormalized === "other") features[7] = 1;

    const marriedNormalized = everMarried.trim().toLowerCase();
    if (marriedNormalized === "yes") features[8] = 1;
    if (marriedNormalized === "no") features[9] = 1;

    const workNormalized = workType.trim().toLowerCase();
    if (workNormalized === "children") features[10] = 1;
    if (
      workNormalized === "govt_job" ||
      workNormalized === "govt job" ||
      workNormalized === "govtjob"
    )
      features[11] = 1;
    if (
      workNormalized === "never_worked" ||
      workNormalized === "never worked" ||
      workNormalized === "neverworked"
    )
      features[12] = 1;
    if (workNormalized === "private") features[13] = 1;
    if (
      workNormalized === "self-employed" ||
      workNormalized === "self employed" ||
      workNormalized === "selfemployed"
    )
      features[14] = 1;

    const residenceNormalized = residenceType.trim().toLowerCase();
    if (residenceNormalized === "urban") features[15] = 1;
    if (residenceNormalized === "rural") features[16] = 1;

    const smokingNormalized = smokingStatus.trim().toLowerCase();
    if (smokingNormalized === "formerly smoked") features[17] = 1;
    if (smokingNormalized === "never smoked") features[18] = 1;
    if (smokingNormalized === "smokes") features[19] = 1;
    if (smokingNormalized === "unknown") features[20] = 1;

    return features;
  };

  const handleCalculate = async () => {
    setErrorMessage("");
    setDiagnosticResult(null);
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features: buildFeatureVector() }),
      });

      if (!response.ok) {
        const detail = await response.text();
        throw new Error(detail || "Server error");
      }

      const data = await response.json();
      setDiagnosticResult({
        notAtRisk: data.not_at_risk,
        atRisk: data.at_risk,
      });
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to reach the diagnostic server."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Stroke Diagnostic</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Blood Pressure (mm/Hg)</Text>
          <View style={styles.splitInputContainer}>
            <View style={styles.splitInput}>
              <Text style={styles.inputLabel}>Systolic (120)</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. 120"
                keyboardType="numeric"
                value={systolic}
                onChangeText={setSystolic}
              />
            </View>
            <View style={styles.splitInput}>
              <Text style={styles.inputLabel}>Diastolic (80)</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. 80"
                keyboardType="numeric"
                value={diastolic}
                onChangeText={setDiastolic}
              />
            </View>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Blood Cholesterol (mg/dL)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 160"
            keyboardType="numeric"
            value={cholesterol}
            onChangeText={setCholesterol}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Blood Sugar (mg/dL)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 100"
            keyboardType="numeric"
            value={bloodSugar}
            onChangeText={setBloodSugar}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>BMI (kg/m²)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 25"
            keyboardType="numeric"
            value={bmi}
            onChangeText={setBmi}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Weekly Exercise (hours)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 2.5"
            keyboardType="numeric"
            value={exercise}
            onChangeText={setExercise}
          />
        </View>

        <TouchableOpacity
          style={styles.calculateButton}
          onPress={handleCalculate}
        >
          <Text style={styles.calculateButtonText}>
            {isLoading ? "CALCULATING..." : "CALCULATE RISK"}
          </Text>
        </TouchableOpacity>

        {errorMessage ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        ) : null}

        {diagnosticResult ? (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Diagnostic Results</Text>
            <Text style={styles.resultText}>
              Not at risk: {(diagnosticResult.notAtRisk * 100).toFixed(1)}%
            </Text>
            <Text style={styles.resultText}>
              At risk: {(diagnosticResult.atRisk * 100).toFixed(1)}%
            </Text>
          </View>
        ) : null}

        <View style={styles.noteContainer}>
          <Text style={styles.noteText}>
            Additional information from your profile will be included in the assessment.
          </Text>
        </View>
      </View>
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
    paddingTop: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#00796B",
    marginBottom: 8,
  },
  inputLabel: {
    fontSize: 12,
    color: "#999",
    marginBottom: 4,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  splitInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  splitInput: {
    flex: 1,
    marginRight: 10,
  },
  checkboxGroup: {
    marginTop: 10,
    marginBottom: 30,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#00796B",
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: "#00796B",
  },
  checkmark: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  checkboxLabel: {
    fontSize: 16,
    color: "#333",
  },
  calculateButton: {
    backgroundColor: "#FF7043",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  calculateButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  noteContainer: {
    backgroundColor: "#E3F2FD",
    borderRadius: 8,
    padding: 16,
    marginBottom: 30,
  },
  noteText: {
    fontSize: 13,
    color: "#666",
    lineHeight: 20,
    textAlign: "center",
  },
  errorContainer: {
    backgroundColor: "#FFEBEE",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: "#C62828",
    fontSize: 13,
    textAlign: "center",
  },
  resultContainer: {
    backgroundColor: "#E8F5E9",
    borderRadius: 8,
    padding: 16,
    marginBottom: 30,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1B5E20",
    marginBottom: 8,
    textAlign: "center",
  },
  resultText: {
    fontSize: 14,
    color: "#2E7D32",
    textAlign: "center",
    marginBottom: 4,
  },
};
