import { Text, View, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";

export default function DiagnosticScreen() {
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [hasHypertension, setHasHypertension] = useState(false);
  const [hasHeartDisease, setHasHeartDisease] = useState(false);
  const [everMarried, setEverMarried] = useState("");
  const [workType, setWorkType] = useState("");
  const [residenceType, setResidenceType] = useState("");
  const [avgGlucoseLevel, setAvgGlucoseLevel] = useState("");
  const [bmi, setBmi] = useState("");
  const [smokingStatus, setSmokingStatus] = useState("");
  const [diagnosticResult, setDiagnosticResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = "http://10::8000/run_diagnostic";

  const toNumber = (value) => {
    const parsed = parseFloat(value);
    return Number.isNaN(parsed) ? 0 : parsed;
  };

  const validateInputs = () => {
    if (!gender) return "Please select Gender.";
    if (!everMarried) return "Please select Ever Married.";
    if (!workType) return "Please select Work Type.";
    if (!residenceType) return "Please select Residence Type.";
    if (!smokingStatus) return "Please select Smoking Status.";

    const parsedAge = parseFloat(age);
    if (Number.isNaN(parsedAge)) return "Please enter a valid Age.";
    if (parsedAge < 0 || parsedAge > 120)
      return "Age must be between 0 and 120.";

    const parsedGlucose = parseFloat(avgGlucoseLevel);
    if (Number.isNaN(parsedGlucose))
      return "Please enter a valid Average Glucose Level.";
    if (parsedGlucose < 20 || parsedGlucose > 400)
      return "Average Glucose Level must be between 20 and 400.";

    const parsedBmi = parseFloat(bmi);
    if (Number.isNaN(parsedBmi)) return "Please enter a valid BMI.";
    if (parsedBmi < 10 || parsedBmi > 80)
      return "BMI must be between 10 and 80.";

    return "";
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
    const validationError = validateInputs();
    if (validationError) {
      setErrorMessage(validationError);
      setDiagnosticResult(null);
      return;
    }

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
          <Text style={styles.label}>Gender</Text>
          <View style={styles.radioGroup}>
            {[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
              { label: "Other", value: "other" },
            ].map((option) => (
              <TouchableOpacity
                key={option.value}
                style={styles.radioOption}
                onPress={() => setGender(option.value)}
              >
                <View style={styles.radioOuter}>
                  {gender === option.value && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.radioLabel}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 45"
            keyboardType="numeric"
            value={age}
            onChangeText={setAge}
          />
        </View>

        <View style={styles.checkboxGroup}>
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setHasHypertension(!hasHypertension)}
          >
            <View
              style={[
                styles.checkbox,
                hasHypertension && styles.checkboxChecked,
              ]}
            >
              {hasHypertension && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>Hypertension</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setHasHeartDisease(!hasHeartDisease)}
          >
            <View
              style={[
                styles.checkbox,
                hasHeartDisease && styles.checkboxChecked,
              ]}
            >
              {hasHeartDisease && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>Heart Disease</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Ever Married</Text>
          <View style={styles.radioGroup}>
            {[
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
            ].map((option) => (
              <TouchableOpacity
                key={option.value}
                style={styles.radioOption}
                onPress={() => setEverMarried(option.value)}
              >
                <View style={styles.radioOuter}>
                  {everMarried === option.value && (
                    <View style={styles.radioInner} />
                  )}
                </View>
                <Text style={styles.radioLabel}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Work Type</Text>
          <View style={styles.radioGroup}>
            {[
              { label: "Children", value: "children" },
              { label: "Govt job", value: "govt_job" },
              { label: "Never worked", value: "never_worked" },
              { label: "Private", value: "private" },
              { label: "Self-employed", value: "self-employed" },
            ].map((option) => (
              <TouchableOpacity
                key={option.value}
                style={styles.radioOption}
                onPress={() => setWorkType(option.value)}
              >
                <View style={styles.radioOuter}>
                  {workType === option.value && (
                    <View style={styles.radioInner} />
                  )}
                </View>
                <Text style={styles.radioLabel}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Residence Type</Text>
          <View style={styles.radioGroup}>
            {[
              { label: "Rural", value: "rural" },
              { label: "Urban", value: "urban" },
            ].map((option) => (
              <TouchableOpacity
                key={option.value}
                style={styles.radioOption}
                onPress={() => setResidenceType(option.value)}
              >
                <View style={styles.radioOuter}>
                  {residenceType === option.value && (
                    <View style={styles.radioInner} />
                  )}
                </View>
                <Text style={styles.radioLabel}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Average Glucose Level</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 95.3"
            keyboardType="numeric"
            value={avgGlucoseLevel}
            onChangeText={setAvgGlucoseLevel}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>BMI</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 27.1"
            keyboardType="numeric"
            value={bmi}
            onChangeText={setBmi}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Smoking Status</Text>
          <View style={styles.radioGroup}>
            {[
              { label: "Formerly smoked", value: "formerly smoked" },
              { label: "Never smoked", value: "never smoked" },
              { label: "Smokes", value: "smokes" },
              { label: "Unknown", value: "unknown" },
            ].map((option) => (
              <TouchableOpacity
                key={option.value}
                style={styles.radioOption}
                onPress={() => setSmokingStatus(option.value)}
              >
                <View style={styles.radioOuter}>
                  {smokingStatus === option.value && (
                    <View style={styles.radioInner} />
                  )}
                </View>
                <Text style={styles.radioLabel}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={[styles.calculateButton, isLoading && styles.calculateButtonDisabled]}
          onPress={handleCalculate}
          disabled={isLoading}
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
  radioGroup: {
    marginTop: 8,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#00796B",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#00796B",
  },
  radioLabel: {
    fontSize: 15,
    color: "#333",
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
  calculateButtonDisabled: {
    opacity: 0.7,
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
