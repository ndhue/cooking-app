import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for heart icon
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { NutritionData } from "../api/api";
import { useFavorites } from "../hooks/useFavorites"; // Import useFavorites
import { RootStackParamList } from "../navigation/StackNavigation";

type MealScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

const FoodList = ({ foodItems }: { foodItems: NutritionData[] }) => {
  const navigation = useNavigation<MealScreenNavigationProp>();
  const { addFavoriteFood, removeFavoriteFood, favoriteFoods } = useFavorites();
  const isFoodFavorite = (food: NutritionData) =>
    favoriteFoods.some((m) => m.food_name === food.food_name);

  const handleNavigateToDetails = (food: NutritionData) => {
    navigation.navigate("FoodDetailsScreen", { food });
  };

  return (
    <FlatList
      data={foodItems}
      keyExtractor={(item) => item.food_name}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <TouchableOpacity
            onPress={() => handleNavigateToDetails(item)}
            style={styles.itemContent}
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
          <TouchableOpacity
            onPress={() =>
              isFoodFavorite(item)
                ? removeFavoriteFood(item.food_name)
                : addFavoriteFood(item)
            }
            style={styles.heartIcon}
          >
            <Ionicons
              name="heart"
              size={24}
              color={isFoodFavorite(item) ? "red" : "grey"}
            />
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
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
    fontSize: 16,
    fontWeight: "bold",
  },
  itemSubText: {
    fontSize: 12,
    color: "#888",
  },
  heartIcon: {
    padding: 8,
  },
});

export default FoodList;
