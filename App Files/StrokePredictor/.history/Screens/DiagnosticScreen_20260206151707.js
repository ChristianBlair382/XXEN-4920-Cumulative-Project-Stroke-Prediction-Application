import { Text, View, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";

export default function DiagnosticScreen() {
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [cholesterol, setCholesterol] = useState("");
  const [bloodSugar, setBloodSugar] = useState("");
  const [bmi, setBmi] = useState("");
  const [exercise, setExercise] = useState("");
  const [hasDiabetes, setHasDiabetes] = useState(false);
  const [hadStroke, setHadStroke] = useState(false);
  
  const [userInput, setUserInput] = useState(new Array(21).fill(0));

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

        <View style={styles.checkboxGroup}>
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setHasDiabetes(!hasDiabetes)}
          >
            <View style={[styles.checkbox, hasDiabetes && styles.checkboxChecked]}>
              {hasDiabetes && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>I have Diabetes</Text>
          </TouchableOpacity>

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

        <TouchableOpacity style={styles.calculateButton}>
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
