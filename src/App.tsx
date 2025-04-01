import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import OnboardingScreen from "./screens/OnboardingScreen";
import BottomNavigation from "./navigation/BottomNavigation";

const App = () => {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

  return (
    <NavigationContainer>
      {isOnboardingComplete ? (
        <BottomNavigation />
      ) : (
        <OnboardingScreen onComplete={() => setIsOnboardingComplete(true)} />
      )}
    </NavigationContainer>
  );
};

export default App;
