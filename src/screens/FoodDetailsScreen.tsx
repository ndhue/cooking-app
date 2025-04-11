import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { PieChart } from "react-native-chart-kit";
import { NutritionData } from "../api/api";
import { useFavorites } from "../hooks/useFavorites";

type DetailScreenRouteProp = RouteProp<
  { FoodDetailsScreen: { food: NutritionData } },
  "FoodDetailsScreen"
>;

const FoodDetailsScreen: React.FC = () => {
  const route = useRoute<DetailScreenRouteProp>();
  const food = route.params?.food;

  if (!food) {
    return (
      <View style={styles.centered}>
        <Text style={styles.text}>No food data available.</Text>
      </View>
    );
  }

  const {
    food_name,
    nf_calories,
    nf_protein,
    nf_total_carbohydrate,
    nf_total_fat,
    nf_saturated_fat,
    nf_dietary_fiber,
    nf_sugars,
    nf_cholesterol,
    nf_potassium,
    nf_sodium,
    photo,
  } = food;

  const data = [
    {
      name: "Protein",
      value: nf_protein || 0,
      color: "#d3938d",
      legendFontColor: "#000",
      legendFontSize: 12,
    },
    {
      name: "Carbs",
      value: nf_total_carbohydrate || 0,
      color: "#edc85a",
      legendFontColor: "#000",
      legendFontSize: 12,
    },
    {
      name: "Fat",
      value: nf_total_fat || 0,
      color: "#34A853",
      legendFontColor: "#000",
      legendFontSize: 12,
    },
    {
      name: "Saturated Fat",
      value: nf_saturated_fat || 0,
      color: "#4285F4",
      legendFontColor: "#000",
      legendFontSize: 15,
    },
    {
      name: "Cholesterol",
      value: nf_cholesterol || 0,
      color: "#A142F4",
      legendFontColor: "#000",
      legendFontSize: 15,
    },
    {
      name: "Sodium",
      value: nf_sodium || 0,
      color: "#ef9550",
      legendFontColor: "#000",
      legendFontSize: 15,
    },
    {
      name: "Dietary Fiber",
      value: nf_dietary_fiber || 0,
      color: "#D9E3F0",
      legendFontColor: "#000",
      legendFontSize: 15,
    },
    {
      name: "Sugars",
      value: nf_sugars || 0,
      color: "#F7C6C7",
      legendFontColor: "#000",
      legendFontSize: 15,
    },
    {
      name: "Kali", // Potassium
      value: nf_potassium || 0,
      color: "#FDD835",
      legendFontColor: "#000",
      legendFontSize: 15,
    },
  ];

  const { addFavoriteFood, removeFavoriteFood, favoriteFoods } = useFavorites();
  const isFoodFavorite = favoriteFoods.some(
    (m) => m.food_name === food.food_name
  );

  const handleFavoriteToggle = () => {
    if (isFoodFavorite) {
      removeFavoriteFood(food_name);
    } else {
      addFavoriteFood(food);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={{ uri: photo.thumb }} style={styles.imageHeader} />
        <View style={styles.content}>
          <Text style={styles.title}>{food_name}</Text>
          <Text style={[styles.calories, styles.textMuted]}>
            Calories: {nf_calories || "N/A"} kcal
          </Text>

          <PieChart
            data={data}
            width={Dimensions.get("window").width - 40}
            height={220}
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor={"value"}
            backgroundColor={"transparent"}
            paddingLeft={"0"}
            absolute
          />

          <Text
            style={[
              styles.favoriteButton,
              { backgroundColor: isFoodFavorite ? "#FF8473" : "#91C788" },
            ]}
            onPress={handleFavoriteToggle}
          >
            {isFoodFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 40,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageHeader: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: "center",
    marginBottom: 16,
    resizeMode: "cover",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  calories: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  nutritionGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  column: {
    flex: 1,
  },
  nutritionItem: {
    fontSize: 14,
    marginBottom: 6,
  },
  textMuted: {
    color: "#888",
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  favoriteButton: {
    marginTop: 24,
    fontSize: 16,
    color: "#fff",
    padding: 12,
    borderRadius: 8,
    paddingVertical: 10,
    textAlign: "center",
    overflow: "hidden",
  },
  text: {
    fontSize: 16,
  },
});

export default FoodDetailsScreen;
