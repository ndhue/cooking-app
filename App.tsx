import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import StackNavigation from "./src/navigation/StackNavigation";

const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
