import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for the heart icon
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
import { Meal } from "../api/api";
import { useFavorites } from "../hooks/useFavorites";
import { RootStackParamList } from "../navigation/StackNavigation";

type MealScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

const MealList = ({ meals }: { meals: Meal[] }) => {
  const navigation = useNavigation<MealScreenNavigationProp>();

  const { addFavoriteMeal, removeFavoriteMeal, favoriteMeals } = useFavorites();
  const isMealFavorite = (mealId: string) =>
    favoriteMeals.some((m) => m.idMeal === mealId);

  const handleNavigateToMealDetails = (mealId: string) => {
    navigation.navigate("MealDetailsScreen", { mealId });
  };

  return (
    <FlatList
      data={meals}
      keyExtractor={(item) => item.idMeal}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <TouchableOpacity
            style={styles.itemContent}
            onPress={() => handleNavigateToMealDetails(item.idMeal)}
          >
            <Image
              source={{ uri: item.strMealThumb }}
              style={styles.itemImage}
            />
            <Text style={styles.itemText}>{item.strMeal}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              isMealFavorite(item.idMeal)
                ? removeFavoriteMeal(item.idMeal)
                : addFavoriteMeal(item)
            }
          >
            <Ionicons
              name="heart"
              size={24}
              color={isMealFavorite(item.idMeal) ? "red" : "grey"}
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
    justifyContent: "space-between",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1, // Ensure content takes up available space
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 16,
    borderRadius: 25,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MealList;
