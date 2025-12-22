import { Text, View, ScrollView, TouchableOpacity } from "react-native";

export default function ProfileScreen() {
  // Mock data - replace with actual user data later
  const profileData = {
    status: "Extreme Risk",
    bloodPressure: "130/90 mmHg",
    cholesterol: "170 mg/dL",
    bloodSugar: "110 mg/dL",
    bmi: "26 kg/m²",
    exercise: "4 hours",
    hasDiabetes: true,
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>My Health Profile</Text>
        
        <View style={styles.statusCard}>
          <Text style={styles.statusLabel}>Current Status:</Text>
          <Text style={styles.statusValue}>{profileData.status}</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Blood Pressure</Text>
            <Text style={styles.statValue}>{profileData.bloodPressure}</Text>
          </View>
          
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Cholesterol</Text>
            <Text style={styles.statValue}>{profileData.cholesterol}</Text>
          </View>
          
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Blood Sugar</Text>
            <Text style={styles.statValue}>{profileData.bloodSugar}</Text>
          </View>
          
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>BMI</Text>
            <Text style={styles.statValue}>{profileData.bmi}</Text>
          </View>
          
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Exercise (Weekly)</Text>
            <Text style={styles.statValue}>{profileData.exercise}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Other Factors</Text>
          <View style={styles.factorRow}>
            <Text style={styles.factorLabel}>Diabetes</Text>
            <Text style={styles.factorValue}>
              {profileData.hasDiabetes ? "Yes" : "No"}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>EDIT DATA (RUN DIAGNOSTIC)</Text>
        </TouchableOpacity>

        <View style={styles.historySection}>
          <Text style={styles.historyTitle}>Assessment History</Text>
          <Text style={styles.historyEmpty}>
            No assessment history available yet. Complete your first diagnostic to see results here.
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
    marginBottom: 20,
  },
  statusCard: {
    backgroundColor: "#FF7043",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    alignItems: "center",
  },
  statusLabel: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 4,
  },
  statusValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#00796B",
    marginBottom: 12,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  statLabel: {
    fontSize: 15,
    color: "#666",
  },
  statValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },
  factorRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  factorLabel: {
    fontSize: 15,
    color: "#666",
  },
  factorValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },
  editButton: {
    backgroundColor: "#FF7043",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginBottom: 30,
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  historySection: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  historyEmpty: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    lineHeight: 22,
    paddingVertical: 20,
  },
};
