import { Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.heartContainer}>
        <View style={styles.heartIcon}>
          <Text style={styles.heartEmoji}>❤️</Text>
        </View>
        
        <Text style={styles.statusLabel}>CURRENT STATUS</Text>
        <Text style={styles.statusText}>Not Calculated</Text>
        <Text style={styles.statusSubtext}>Enter diagnostic data to get assessment</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => router.push('/diagnostic')}
        >
          <Text style={styles.primaryButtonText}>Start a New Test</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>SEND STATUS TO DOCTOR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "space-between",
  },
  heartContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
  },
  heartIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  heartEmoji: {
    fontSize: 60,
  },
  statusLabel: {
    fontSize: 12,
    color: "#999",
    letterSpacing: 1,
    marginBottom: 8,
  },
  statusText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  statusSubtext: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 40,
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 30,
  },
  primaryButton: {
    backgroundColor: "#00796B",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  secondaryButton: {
    backgroundColor: "#FF7043",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
};
