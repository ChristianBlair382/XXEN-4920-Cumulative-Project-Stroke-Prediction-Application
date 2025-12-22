import { Text, View, ScrollView } from "react-native";

export default function AboutUsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>About Us</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Goals</Text>
          <Text style={styles.text}>
            We aim to create a tool that supports both healthcare providers and individual users in addressing stroke risk factors. Our goal is to streamline the assessment of stroke risk and provide actionable insights. This enables providers to conduct routine clinical visits, helping patients evaluate risk quickly and accurately while improving overall quality of care. For individuals, we strive to offer ongoing risk monitoring and personal prevention suggestions that can be used between appointments to stay informed and proactive about their health.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Vision</Text>
          <Text style={styles.text}>
            Our vision is to bridge the current gap in healthcare where providers lack standardized and efficient tools for comprehensive stroke risk assessment. We envision a system that offers providers access to personalized risk information, enabling both providers and patients to engage in proactive, early health management. By empowering users with timely insights, we hope to support meaningful conversations between providers and patients, and contribute to a healthier future.
          </Text>
        </View>

        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            <Text style={styles.disclaimerBold}>Important Note:</Text> This app is designed to supplement, not replace, professional medical care. Always consult with your healthcare provider for medical advice and diagnosis.
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
    marginBottom: 30,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#00796B",
    marginBottom: 12,
  },
  text: {
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
  },
  disclaimer: {
    backgroundColor: "#FFF3E0",
    borderRadius: 12,
    padding: 16,
    marginTop: 10,
    marginBottom: 30,
    borderLeftWidth: 4,
    borderLeftColor: "#FF9800",
  },
  disclaimerText: {
    fontSize: 13,
    color: "#666",
    lineHeight: 20,
  },
  disclaimerBold: {
    fontWeight: "700",
    color: "#F57C00",
  },
};
