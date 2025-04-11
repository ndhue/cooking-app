import type { NavigatorScreenParams } from "@react-navigation/native"; // Import NavigatorScreenParams
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { NutritionData } from "../api/api";
import FoodDetailsScreen from "../screens/FoodDetailsScreen";
import MealDetailsScreen from "../screens/MealDetailsSreen"; // Import MealDetailsScreen
import type { BottomTabParamList } from "./BottomNavigation"; // Import BottomTabParamList
import BottomNavigation from "./BottomNavigation";

// Define the navigation parameter list
export type RootStackParamList = {
  Home: undefined;
  FoodDetailsScreen: { food: NutritionData };
  SearchFoodScreen: undefined;
  SearchMealsScreen: undefined;
  FavoritesScreen: undefined;
  MealDetail: { mealId: string };
  Main: NavigatorScreenParams<BottomTabParamList>; // Use NavigatorScreenParams
  MealDetailsScreen: { mealId: string }; // Add MealDetailsScreen
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigation = () => {
  return (
    <Stack.Navigator>
      {/* Main Bottom Navigation */}
      <Stack.Screen
        name="Main"
        component={BottomNavigation}
        options={{ headerShown: false }}
      />
      {/* Additional Screens */}
      <Stack.Screen
        name="FoodDetailsScreen"
        component={FoodDetailsScreen}
        options={{ title: "Food Details" }}
      />
      <Stack.Screen
        name="MealDetailsScreen" // Add MealDetailsScreen
        component={MealDetailsScreen}
        options={{ title: "Meal Details" }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
