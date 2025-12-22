import { View, Text, TouchableOpacity } from "react-native";
import { Tabs } from "expo-router";
import HomeScreen from "../Screens/HomeScreen";
import AboutUsScreen from "../Screens/AboutUsScreen";
import StepsScreen from "../Screens/StepsScreen";
import FeedbackScreen from "../Screens/FeedbackScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import { useState } from "react";

export default function Index() {
  const [activeTab, setActiveTab] = useState("home");

  const renderScreen = () => {
    switch(activeTab) {
      case "home":
        return <HomeScreen />;
      case "about":
        return <AboutUsScreen />;
      case "steps":
        return <StepsScreen />;
      case "feedback":
        return <FeedbackScreen />;
      case "profile":
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {renderScreen()}
      </View>
      
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={styles.tab}
          onPress={() => setActiveTab("home")}
        >
          <Text style={[styles.tabIcon, activeTab === "home" && styles.activeTab]}>🏠</Text>
          <Text style={[styles.tabLabel, activeTab === "home" && styles.activeTabLabel]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tab}
          onPress={() => setActiveTab("about")}
        >
          <Text style={[styles.tabIcon, activeTab === "about" && styles.activeTab]}>ℹ️</Text>
          <Text style={[styles.tabLabel, activeTab === "about" && styles.activeTabLabel]}>About</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tab}
          onPress={() => setActiveTab("steps")}
        >
          <Text style={[styles.tabIcon, activeTab === "steps" && styles.activeTab]}>📋</Text>
          <Text style={[styles.tabLabel, activeTab === "steps" && styles.activeTabLabel]}>Steps</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tab}
          onPress={() => setActiveTab("feedback")}
        >
          <Text style={[styles.tabIcon, activeTab === "feedback" && styles.activeTab]}>💬</Text>
          <Text style={[styles.tabLabel, activeTab === "feedback" && styles.activeTabLabel]}>Feedback</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tab}
          onPress={() => setActiveTab("profile")}
        >
          <Text style={[styles.tabIcon, activeTab === "profile" && styles.activeTab]}>👤</Text>
          <Text style={[styles.tabLabel, activeTab === "profile" && styles.activeTabLabel]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = {
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingBottom: 20,
    paddingTop: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  tabIcon: {
    fontSize: 24,
    marginBottom: 4,
    opacity: 0.5,
  },
  tabLabel: {
    fontSize: 11,
    color: "#666",
  },
  activeTab: {
    opacity: 1,
  },
  activeTabLabel: {
    color: "#00796B",
    fontWeight: "600",
  },
};
