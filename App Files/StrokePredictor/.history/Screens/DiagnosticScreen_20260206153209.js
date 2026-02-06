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
  const [hadStroke, setHadStroke] = useState(false);

  const [userInput, setUserInput] = useState(new Array(11).fill(0));

  const toNumber = (value) => {
    const parsed = parseFloat(value);
    return Number.isNaN(parsed) ? 0 : parsed;
  };

  const mapGender = (value) => {
    const normalized = value.trim().toLowerCase();
    if (normalized === "male") return 0;
    if (normalized === "female") return 1;
    if (normalized === "other") return 2;
    return 0;
  };

  const mapEverMarried = (value) => {
    const normalized = value.trim().toLowerCase();
    if (normalized === "yes") return 1;
    if (normalized === "no") return 0;
    return 0;
  };

  const mapWorkType = (value) => {
    const normalized = value.trim().toLowerCase();
    if (normalized === "children") return 0;
    if (normalized === "govt_job" || normalized === "govt job" || normalized === "govtjob") return 1;
    if (normalized === "never_worked" || normalized === "never worked" || normalized === "neverworked") return 2;
    if (normalized === "private") return 3;
    if (normalized === "self-employed" || normalized === "self employed" || normalized === "selfemployed") return 4;
    return 0;
  };

  const mapResidenceType = (value) => {
    const normalized = value.trim().toLowerCase();
    if (normalized === "rural") return 0;
    if (normalized === "urban") return 1;
    return 0;
  };

  const mapSmokingStatus = (value) => {
    const normalized = value.trim().toLowerCase();
    if (normalized === "formerly smoked") return 0;
    if (normalized === "never smoked") return 1;
    if (normalized === "smokes") return 2;
    if (normalized === "unknown") return 3;
    return 3;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Stroke Diagnostic</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Gender (Male, Female, Other)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Female"
            value={gender}
            onChangeText={setGender}
          />
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
            <View style={[styles.checkbox, hasHypertension && styles.checkboxChecked]}>
              {hasHypertension && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>Hypertension</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setHasHeartDisease(!hasHeartDisease)}
          >
            <View style={[styles.checkbox, hasHeartDisease && styles.checkboxChecked]}>
              {hasHeartDisease && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>Heart Disease</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Ever Married (Yes or No)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Yes"
            value={everMarried}
            onChangeText={setEverMarried}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Work Type</Text>
          <Text style={styles.inputLabel}>children, Govt_job, Never_worked, Private, Self-employed</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Private"
            value={workType}
            onChangeText={setWorkType}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Residence Type (Rural or Urban)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Urban"
            value={residenceType}
            onChangeText={setResidenceType}
          />
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
          <Text style={styles.inputLabel}>formerly smoked, never smoked, smokes, Unknown</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. never smoked"
            value={smokingStatus}
            onChangeText={setSmokingStatus}
          />
        </View>

        <View style={styles.checkboxGroup}>
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setHadStroke(!hadStroke)}
          >
            <View style={[styles.checkbox, hadStroke && styles.checkboxChecked]}>
              {hadStroke && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>Previously had Stroke</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.calculateButton} onPress={() => {
            const newUserInput = [...userInput];
            newUserInput[0] = mapGender(gender);
            newUserInput[1] = toNumber(age);
            newUserInput[2] = hasHypertension ? 1 : 0;
            newUserInput[3] = hasHeartDisease ? 1 : 0;
            newUserInput[4] = mapEverMarried(everMarried);
            newUserInput[5] = mapWorkType(workType);
            newUserInput[6] = mapResidenceType(residenceType);
            newUserInput[7] = toNumber(avgGlucoseLevel);
            newUserInput[8] = toNumber(bmi);
            newUserInput[9] = mapSmokingStatus(smokingStatus);
            newUserInput[10] = hadStroke ? 1 : 0;
            setUserInput(newUserInput);
          }}>
          <Text style={styles.calculateButtonText}>CALCULATE RISK</Text>
        </TouchableOpacity>

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
};
