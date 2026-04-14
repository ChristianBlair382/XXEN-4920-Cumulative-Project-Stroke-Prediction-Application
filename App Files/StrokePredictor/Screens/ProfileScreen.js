import { Text, View, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useCallback, useMemo, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import {
  formatRiskStatus,
  getLastDiagnosisResult,
  getAllDiagnosisResults,
  initializeDiagnosisRepository,
} from "../services/diagnosisRepository";

export default function ProfileScreen({ onLogout }) {
  const [latestResult, setLatestResult] = useState(null);
  const [allResults, setAllResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const userEmail = auth.currentUser?.email ?? "Unknown";

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;

      const loadData = async () => {
        try {
          setIsLoading(true);
          await initializeDiagnosisRepository();
          const [latest, all] = await Promise.all([
            getLastDiagnosisResult(),
            getAllDiagnosisResults(),
          ]);
          if (isMounted) {
            setLatestResult(latest);
            setAllResults(all);
          }
        } finally {
          if (isMounted) setIsLoading(false);
        }
      };

      loadData();
      return () => { isMounted = false; };
    }, [])
  );

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        style: "destructive",
        onPress: async () => {
          await signOut(auth);
          onLogout();
        },
      },
    ]);
  };

  const riskStatus = isLoading ? "Loading..." : formatRiskStatus(latestResult);

  const statusColor = () => {
    if (!latestResult) return "#FF7043";
    const pct = latestResult.atRisk * 100;
    if (pct >= 70) return "#C62828";
    if (pct >= 40) return "#F57C00";
    return "#2E7D32";
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>My Health Profile</Text>

        {/* User Info */}
        <View style={styles.userCard}>
          <Text style={styles.userIcon}>👤</Text>
          <Text style={styles.userEmail}>{userEmail}</Text>
        </View>

        {/* Risk Status Card */}
        <View style={[styles.statusCard, { backgroundColor: statusColor() }]}>
          <Text style={styles.statusLabel}>Current Risk Status</Text>
          <Text style={styles.statusValue}>{riskStatus}</Text>
          {latestResult && (
            <Text style={styles.statusMeta}>
              At risk: {(latestResult.atRisk * 100).toFixed(1)}% · Not at risk: {(latestResult.notAtRisk * 100).toFixed(1)}%
            </Text>
          )}
        </View>

        {/* Assessment History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Assessment History</Text>

          {isLoading ? (
            <ActivityIndicator color="#00796B" style={{ marginVertical: 20 }} />
          ) : allResults.length === 0 ? (
            <Text style={styles.emptyText}>
              No assessments yet. Complete your first diagnostic to see results here.
            </Text>
          ) : (
            allResults.map((result, index) => (
              <View key={result.id} style={styles.historyRow}>
                <View style={styles.historyLeft}>
                  <Text style={styles.historyIndex}>#{allResults.length - index}</Text>
                  <Text style={styles.historyDate}>
                    {new Date(result.requestedAt).toLocaleString()}
                  </Text>
                </View>
                <View style={styles.historyRight}>
                  <Text style={[
                    styles.historyRisk,
                    { color: result.atRisk >= 0.7 ? "#C62828" : result.atRisk >= 0.4 ? "#F57C00" : "#2E7D32" }
                  ]}>
                    {formatRiskStatus(result)}
                  </Text>
                  <Text style={styles.historyPct}>
                    {(result.atRisk * 100).toFixed(1)}% at risk
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>🚪  Log Out</Text>
        </TouchableOpacity>

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
  userCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  userIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  userEmail: {
    fontSize: 15,
    color: "#333",
    fontWeight: "500",
  },
  statusCard: {
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
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  statusMeta: {
    fontSize: 13,
    color: "#fff",
    marginTop: 6,
    opacity: 0.9,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#00796B",
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    lineHeight: 22,
    paddingVertical: 20,
  },
  historyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  historyLeft: {
    flex: 1,
  },
  historyIndex: {
    fontSize: 12,
    color: "#aaa",
    marginBottom: 2,
  },
  historyDate: {
    fontSize: 13,
    color: "#666",
  },
  historyRight: {
    alignItems: "flex-end",
  },
  historyRisk: {
    fontSize: 14,
    fontWeight: "700",
  },
  historyPct: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  logoutButton: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 40,
    borderWidth: 1.5,
    borderColor: "#e53935",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#e53935",
  },
};