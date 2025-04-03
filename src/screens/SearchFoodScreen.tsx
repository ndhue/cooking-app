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
import { NutritionData } from "../api/api";
import HistoryModal from "../components/HistoryModal";
import News from "../components/News";
import { useFetchFoods, useSearchHistory } from "../hooks";
import { RootStackParamList } from "../navigation/StackNavigation";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

const SearchFoodScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);
  const { foodItems, loading, error, fetchFoods, clearFoods } = useFetchFoods();
  const { history, addToHistory, clearHistory } = useSearchHistory();

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      addToHistory(searchQuery); // Lưu từ khóa tìm kiếm
      fetchFoods(searchQuery); // Gọi API tìm kiếm
      setSearchQuery(""); // Reset lại ô tìm kiếm
    }
  };

  const handleClearSearch = () => {
    clearFoods(); // Reset the food items
  };
  const handleNavigateToDetails = (food: NutritionData) => {
    navigation.navigate("FoodDetailsScreen", { food });
  };

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for food..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity
          style={styles.historyIcon}
          onPress={() => setShowHistoryModal(true)}
        >
          <Ionicons name="time-outline" size={24} color="#007AFF" />
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
        <ActivityIndicator size="large" color="#0000ff" />
      ) : !foodItems ? (
        <Text style={styles.emptyFood}>Start searching for foods.</Text>
      ) : foodItems.length > 0 ? (
        <FlatList
          data={foodItems}
          keyExtractor={(item) => item.food_name}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={() => handleNavigateToDetails(item)}
            >
              <Image
                source={{ uri: item.photo.thumb }}
                style={styles.itemImage}
              />
              <View style={styles.itemDetails}>
                <Text style={styles.itemText}>{item.food_name}</Text>
                <Text style={styles.itemSubText}>
                  Calories: {item.nf_calories || "N/A"} kcal
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
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
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
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
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  emptyFood: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "#888",
    fontStyle: "italic",
  },
});
export default SearchFoodScreen;
