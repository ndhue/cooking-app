import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MealList from "../components/MealList";
import News from "../components/News";
import useSearchMeals from "../hooks/useSearchMeals";

const SearchMealsScreen = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { meals, isLoading, error } = useSearchMeals(searchQuery);

  const handleSearch = () => {
    if (searchInput.trim() !== "") {
      setSearchInput(""); // Clear the search input
      setSearchQuery(searchInput); // Set the search query
    }
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setSearchQuery("");
  };

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for meals..."
          value={searchInput}
          onChangeText={setSearchInput}
          onSubmitEditing={handleSearch}
        />
      </View>

      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>

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
        <View style={{ flex: 1 }}>
          <MealList meals={meals} />
        </View>
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
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 8,
    paddingHorizontal: 8,
    backgroundColor: "#fafafa",
  },
  searchInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 8,
  },
  searchButton: {
    backgroundColor: "#91C788",
    padding: 12,
    borderRadius: 16,
    marginBottom: 16,
    alignItems: "center",
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  clearButton: {
    marginVertical: 10,
    alignItems: "center",
  },
  clearButtonText: {
    color: "#FF6347",
    fontSize: 16,
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
