import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { FavoritesScreen } from "../screens";
import HomeScreen from "../screens/HomeScreen";
import SearchFoodScreen from "../screens/SearchFoodScreen";
import SearchMealsScreen from "../screens/SearchMealsScreen";

// Define BottomTabParamList
export type BottomTabParamList = {
  Home: undefined;
  Foods: undefined;
  Meals: undefined;
  Favorites: undefined;
};

// Update Tab Navigator with type
const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Foods") {
            iconName = "fast-food";
          } else if (route.name === "Meals") {
            iconName = "restaurant";
          } else if (route.name === "Favorites") {
            iconName = "heart";
          } else if (route.name === "Profile") {
            iconName = "person";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#79C388",
        tabBarInactiveTintColor: "#cecece",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Foods" component={SearchFoodScreen} />
      <Tab.Screen name="Meals" component={SearchMealsScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
