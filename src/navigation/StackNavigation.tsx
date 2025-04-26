import type { NavigatorScreenParams } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { NutritionData } from "../api/api";
import FoodDetailsScreen from "../screens/FoodDetailsScreen";
import MealDetailsScreen from "../screens/MealDetailsSreen";
import type { BottomTabParamList } from "./BottomNavigation";
import BottomNavigation from "./BottomNavigation";

export type RootStackParamList = {
  Home: undefined;
  FoodDetailsScreen: { food: NutritionData };
  SearchFoodScreen: undefined;
  SearchMealsScreen: undefined;
  FavoritesScreen: undefined;
  MealDetail: { mealId: string };
  Main: NavigatorScreenParams<BottomTabParamList>; 
  MealDetailsScreen: { mealId: string }; 
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={BottomNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FoodDetailsScreen"
        component={FoodDetailsScreen}
        options={{ title: "Food Details" }}
      />
      <Stack.Screen
        name="MealDetailsScreen"
        component={MealDetailsScreen}
        options={{ title: "Meal Details" }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
