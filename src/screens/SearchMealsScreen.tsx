import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import News from "../components/News";
import useSearchMeals from "../hooks/useSearchMeals";
import { RootStackParamList } from "../navigation/StackNavigation";

type MealScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

const SearchMealsScreen = () => {
  const navigation = useNavigation<MealScreenNavigationProp>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { meals, isLoading, error, fetchMeals, clearMeals } = useSearchMeals();

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      fetchMeals(searchQuery); // Fetch meals from API
      setSearchQuery(""); // Reset search input
    }
  };

  const handleClearSearch = () => {
    clearMeals(); // Clear meals data
  };

  const handleNavigateToMealDetails = (mealId: string) => {
    navigation.navigate("MealDetailsScreen", { mealId }); // Navigate to MealDetailsScreen
  };

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for meals..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Ionicons name="search" size={24} color="#91C788" />
        </TouchableOpacity>
      </View>

      {/* Clear Button */}
      {Array.isArray(meals) && meals.length > 0 && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={handleClearSearch}
        >
          <Text style={styles.clearButtonText}>Clear Search</Text>
        </TouchableOpacity>
      )}

      {/* Loading Indicator */}
      {isLoading ? (
        <ActivityIndicator size="large" color="#91C788" />
      ) : !meals ? (
        <Text style={styles.emptyText}>Start searching for meals.</Text>
      ) : meals.length > 0 ? (
        <FlatList
          data={meals}
          keyExtractor={(item) => item.idMeal}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={() => handleNavigateToMealDetails(item.idMeal)}
            >
              <Image
                source={{ uri: item.strMealThumb }}
                style={styles.itemImage}
              />
              <Text style={styles.itemText}>{item.strMeal}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.emptyText}>No meals found.</Text>
      )}

      {/* Error Message */}
      {error && <Text style={styles.errorText}>{error}</Text>}

      <News />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  searchInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 8,
  },
  searchButton: {
    padding: 8,
  },
  clearButton: {
    marginVertical: 10,
    alignItems: "center",
  },
  clearButtonText: {
    color: "#FF6347",
    fontSize: 16,
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
  itemText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#888",
    fontStyle: "italic",
  },
});

export default SearchMealsScreen;
