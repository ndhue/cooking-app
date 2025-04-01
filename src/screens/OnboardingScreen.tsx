import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const OnboardingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const handleStart = () => {
    onComplete();
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/Onboarding.png")}
        style={styles.image}
      />
      <Text style={styles.title}>Welcome to Recipe Finder</Text>
      <Text style={styles.subtitle}>Find delicious recipes easily!</Text>
      <TouchableOpacity style={styles.button} onPress={handleStart}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#91C788",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default OnboardingScreen;
