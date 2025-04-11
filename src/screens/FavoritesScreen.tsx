import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"; // Import type
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"; // Import FlatList and Image
import EmptyState from "../components/EmptyState";
import FoodList from "../components/FoodList";
import MealList from "../components/MealList";
import { useFavorites } from "../hooks/useFavorites";
import type { RootStackParamList } from "../navigation/StackNavigation"; // Import RootStackParamList

const FavoritesScreen = () => {
  const { favoriteFoods, favoriteMeals } = useFavorites();
  const [selectedTab, setSelectedTab] = useState<"Food" | "Recipes">("Food");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>(); // Typed navigation

  const renderEmptyState = () => {
    if (selectedTab === "Food" && favoriteFoods.length === 0) {
      return (
        <EmptyState
          title="No Foods Found!"
          subtitle="You don’t save any foods. Go ahead, search and save your favorite food."
          buttonText="Search Food"
          onButtonPress={() => navigation.navigate("Main", { screen: "Foods" })} // Update navigation logic
        />
      );
    }

    if (selectedTab === "Recipes" && favoriteMeals.length === 0) {
      return (
        <EmptyState
          title="No Recipes Found!"
          subtitle="You don’t save any recipes. Go ahead, search and save your favorite recipe."
          buttonText="Search Recipe"
          onButtonPress={() => navigation.navigate("Main", { screen: "Meals" })} // Correct route name
        />
      );
    }

    return null;
  };

  const renderFavorites = () => {
    const data = selectedTab === "Food" ? favoriteFoods : favoriteMeals;
    if (data.length === 0) return renderEmptyState();

    if (selectedTab === "Food") {
      return <FoodList foodItems={data} />;
    }

    if (selectedTab === "Recipes") {
      return <MealList meals={data} />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => setSelectedTab("Food")}
          style={[
            styles.tabButton,
            selectedTab === "Food"
              ? styles.tabButtonActive
              : styles.tabButtonInactive,
            styles.tabButtonLeft,
          ]}
        >
          <Text
            style={
              selectedTab === "Food"
                ? styles.tabTextActive
                : styles.tabTextInactive
            }
          >
            Food
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSelectedTab("Recipes")}
          style={[
            styles.tabButton,
            selectedTab === "Recipes"
              ? styles.tabButtonActive
              : styles.tabButtonInactive,
            styles.tabButtonRight,
          ]}
        >
          <Text
            style={
              selectedTab === "Recipes"
                ? styles.tabTextActive
                : styles.tabTextInactive
            }
          >
            Recipes
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>{renderFavorites()}</View>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  tabContainer: {
    flexDirection: "row",
    marginVertical: 16,
    marginHorizontal: 16,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
  },
  tabButtonLeft: {
    borderTopLeftRadius: 28,
    borderBottomLeftRadius: 28,
  },
  tabButtonRight: {
    borderTopRightRadius: 28,
    borderBottomRightRadius: 28,
  },
  tabButtonActive: {
    backgroundColor: "#FF8473",
  },
  tabButtonInactive: {
    backgroundColor: "#FFF8EE",
  },
  tabTextActive: {
    color: "white",
    fontWeight: "600",
  },
  tabTextInactive: {
    color: "#FF8473",
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  text: {
    fontSize: 16,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 16,
    borderRadius: 25,
  },
  itemDetails: {
    flex: 1,
  },
  itemText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemSubText: {
    fontSize: 14,
    color: "#888",
  },
});

export default FavoritesScreen;
