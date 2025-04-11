import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import FoodList from "../components/FoodList";
import HistoryModal from "../components/HistoryModal";
import News from "../components/News";
import { useFetchFoods, useSearchHistory } from "../hooks";

const SearchFoodScreen = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);
  const { foodItems, loading, error } = useFetchFoods(searchQuery);
  const { history, addToHistory, clearHistory } = useSearchHistory();

  const handleSearch = () => {
    if (searchInput.trim() !== "") {
      addToHistory(searchQuery); // Lưu từ khóa tìm kiếm
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
          placeholder="Search for food..."
          value={searchInput}
          onChangeText={setSearchInput}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity
          style={styles.historyIcon}
          onPress={() => setShowHistoryModal(true)}
        >
          <Ionicons name="time-outline" size={24} color="#91C788" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>

      {/* Clear Button */}
      {Array.isArray(foodItems) && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={handleClearSearch}
        >
          <Text style={[styles.favoritesButtonText, { paddingBottom: 10 }]}>
            Clear search
          </Text>
        </TouchableOpacity>
      )}

      {/* History Modal */}
      <HistoryModal
        visible={showHistoryModal}
        history={history}
        onSelectItem={(item) => {
          setSearchQuery(item);
          setShowHistoryModal(false);
        }}
        onClearHistory={clearHistory}
        onClose={() => setShowHistoryModal(false)}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#91C788" />
      ) : !foodItems ? (
        <Text style={styles.emptyFood}>Start searching for foods.</Text>
      ) : foodItems.length > 0 ? (
        <View style={{ flex: 1 }}>
          <FoodList foodItems={foodItems} />
        </View>
      ) : (
        <Text style={styles.emptyFood}>No food founds.</Text>
      )}

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
  favoritesButton: {
    borderRadius: 8,
    marginBottom: 8,
    alignItems: "flex-start",
  },
  favoritesButtonText: {
    color: "#FF6347",
    fontSize: 16,
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
  historyIcon: {
    padding: 8,
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
    borderRadius: 8,
    alignItems: "flex-end",
  },
  emptyFood: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#888",
    fontStyle: "italic",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});
export default SearchFoodScreen;
