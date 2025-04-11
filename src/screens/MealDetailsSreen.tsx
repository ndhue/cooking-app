import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useFavorites } from "../hooks/useFavorites";
import useMealDetails from "../hooks/useMealDetails";

export type MealDetailScreenRouteProp = RouteProp<
  { MealDetailsScreen: { mealId: string } },
  "MealDetailsScreen"
>;

const MealDetailScreen = () => {
  const route = useRoute<MealDetailScreenRouteProp>();
  const { mealId } = route.params;
  const { meal, isLoading, error } = useMealDetails(mealId);
  const { addFavoriteMeal, removeFavoriteMeal, favoriteMeals } = useFavorites();
  const isMealFavorite = favoriteMeals.some((m) => m.idMeal === mealId);

  const handleFavoriteToggle = () => {
    if (!meal) return;
    if (isMealFavorite) {
      removeFavoriteMeal(meal.idMeal);
    } else {
      addFavoriteMeal(meal);
    }
  };

  if (isLoading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#91C788" />
      </View>
    );
  if (error) return <Text>Error: {error}</Text>;
  if (!meal) return <Text>No details found.</Text>;

  // Extract ingredients and measurements
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && measure) {
      ingredients.push({ ingredient, measure });
    }
  }

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#fff" }}>
      <FlatList
        ListHeaderComponent={
          <>
            <Image
              source={{ uri: meal.strMealThumb }}
              style={{ width: "100%", height: 250, borderRadius: 16 }}
            />
            <View style={{ padding: 16 }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  marginVertical: 8,
                }}
              >
                {meal.strMeal}
              </Text>
              <Text style={{ marginBottom: 8, color: "#888" }}>
                {meal.strInstructions}
              </Text>

              <Text
                style={{ fontSize: 20, fontWeight: "bold", marginVertical: 8 }}
              >
                Ingredients
              </Text>
            </View>
          </>
        }
        data={ingredients}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 4,
              marginHorizontal: 16,
            }}
          >
            <Image
              source={{
                uri: `https://www.themealdb.com/images/ingredients/${item.ingredient}.png`,
              }}
              style={{ width: 50, height: 50, marginRight: 8 }}
            />
            <Text style={{ fontSize: 16, color: "#888" }}>
              {item.ingredient} - {item.measure}
            </Text>
          </View>
        )}
        ListFooterComponent={
          <TouchableOpacity
            style={{
              backgroundColor: isMealFavorite ? "#FF8473" : "#91C788",
              padding: 12,
              borderRadius: 8,
              marginTop: 16,
            }}
            onPress={handleFavoriteToggle}
          >
            <Text style={{ color: "#fff", textAlign: "center", fontSize: 18 }}>
              {isMealFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
};

export default MealDetailScreen;
