import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  // Mock data - replace with actual user data later
  const profileData = {
    status: "Extreme Risk",
    gender: "Female",
    age: 45,
    hypertension: false,
    heartDisease: false,
    everMarried: "Yes",
    workType: "Private",
    residenceType: "Urban",
    avgGlucoseLevel: 95.3,
    bmi: 27.1,
    smokingStatus: "never smoked",
    stroke: false,
  };

  const [gender, setGender] = useState(profileData.gender.toLowerCase());
  const [everMarried, setEverMarried] = useState(
    profileData.everMarried.toLowerCase()
  );
  const [workType, setWorkType] = useState(profileData.workType.toLowerCase());
  const [residenceType, setResidenceType] = useState(
    profileData.residenceType.toLowerCase()
  );
  const [smokingStatus, setSmokingStatus] = useState(
    profileData.smokingStatus.toLowerCase()
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>My Health Profile</Text>

        <View style={styles.statusCard}>
          <Text style={styles.statusLabel}>Current Status:</Text>
          <Text style={styles.statusValue}>{profileData.status}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Demographics</Text>
          <View style={styles.fieldGroup}>
            <Text style={styles.statLabel}>Gender</Text>
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
                    {gender === option.value && (
                      <View style={styles.radioInner} />
                    )}
                  </View>
                  <Text style={styles.radioLabel}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Age</Text>
            <Text style={styles.statValue}>{profileData.age}</Text>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.statLabel}>Residence Type</Text>
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
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Metrics</Text>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Avg Glucose Level</Text>
            <Text style={styles.statValue}>{profileData.avgGlucoseLevel}</Text>
          </View>

          <View style={styles.statRow}>
            <Text style={styles.statLabel}>BMI</Text>
            <Text style={styles.statValue}>{profileData.bmi}</Text>
          </View>

          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Hypertension</Text>
            <Text style={styles.statValue}>
              {profileData.hypertension ? "Yes" : "No"}
            </Text>
          </View>

          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Heart Disease</Text>
            <Text style={styles.statValue}>
              {profileData.heartDisease ? "Yes" : "No"}
            </Text>
          </View>

          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Stroke</Text>
            <Text style={styles.statValue}>
              {profileData.stroke ? "Yes" : "No"}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lifestyle</Text>
          <View style={styles.fieldGroup}>
            <Text style={styles.statLabel}>Ever Married</Text>
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

          <View style={styles.fieldGroup}>
            <Text style={styles.statLabel}>Work Type</Text>
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

          <View style={styles.fieldGroup}>
            <Text style={styles.statLabel}>Smoking Status</Text>
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
        </View>

        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>EDIT DATA (RUN DIAGNOSTIC)</Text>
        </TouchableOpacity>

        <View style={styles.historySection}>
          <Text style={styles.historyTitle}>Assessment History</Text>
          <Text style={styles.historyEmpty}>
            No assessment history available yet. Complete your first diagnostic
            to see results here.
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
  fieldGroup: {
    marginBottom: 12,
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
