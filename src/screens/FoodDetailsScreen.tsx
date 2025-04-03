import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { NutritionData } from "../api/api";
import useFavoriteFoods from "../hooks/useFavoriteFoods";

type DetailScreenRouteProp = RouteProp<
  { FoodDetailsScreen: { food: NutritionData } },
  "FoodDetailsScreen"
>;

const FoodDetailsScreen: React.FC = () => {
  const route = useRoute<DetailScreenRouteProp>();
  const food = route.params?.food;

  if (!food) {
    return (
      <View style={styles.container}>
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

  const truncateLabel = (label: string, maxLength: number) =>
    label.length > maxLength ? `${label.substring(0, maxLength)}...` : label;

  const data = [
    {
      name: truncateLabel("Chất đạm", 8), // Protein
      value: nf_protein || 0,
      color: "#d3938d",
      legendFontColor: "#000",
      legendFontSize: 15,
    },
    {
      name: truncateLabel("Tinh bột", 8), // Carbs
      value: nf_total_carbohydrate || 0,
      color: "#edc85a",
      legendFontColor: "#000",
      legendFontSize: 15,
    },
    {
      name: truncateLabel("Chất béo", 8), // Fat
      value: nf_total_fat || 0,
      color: "#34A853",
      legendFontColor: "#000",
      legendFontSize: 15,
    },
    {
      name: truncateLabel("Chất béo bão hòa", 8), // Saturated Fat
      value: nf_saturated_fat || 0,
      color: "#4285F4",
      legendFontColor: "#000",
      legendFontSize: 15,
    },
    {
      name: truncateLabel("Cholesterol", 8), // Cholesterol
      value: nf_cholesterol || 0,
      color: "#A142F4",
      legendFontColor: "#000",
      legendFontSize: 15,
    },
    {
      name: truncateLabel("Natri", 8), // Sodium
      value: nf_sodium || 0,
      color: "#ef9550",
      legendFontColor: "#000",
      legendFontSize: 15,
    },
    {
      name: truncateLabel("Chất xơ", 8), // Dietary Fiber
      value: nf_dietary_fiber || 0,
      color: "#D9E3F0",
      legendFontColor: "#000",
      legendFontSize: 15,
    },
    {
      name: truncateLabel("Đường", 8), // Sugars
      value: nf_sugars || 0,
      color: "#F7C6C7",
      legendFontColor: "#000",
      legendFontSize: 15,
    },
    {
      name: truncateLabel("Kali", 8), // Potassium
      value: nf_potassium || 0,
      color: "#FDD835",
      legendFontColor: "#000",
      legendFontSize: 15,
    },
  ];

  const { addFavorite, removeFavorite, isFavorite } = useFavoriteFoods();
  const isFoodFavorite = isFavorite(food_name);

  const handleFavoriteToggle = () => {
    if (isFoodFavorite) {
      removeFavorite(food_name);
    } else {
      addFavorite(food);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo.thumb }} style={styles.image} />
      <Text style={styles.title}>{food_name}</Text>
      <Text style={styles.text}>Calories: {nf_calories || "N/A"} kcal</Text>

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
      <Text style={styles.favoriteButton} onPress={handleFavoriteToggle}>
        {isFoodFavorite
          ? "Đã thêm vào danh sách yêu thích"
          : "Thêm vào danh sách yêu thích"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
  },
  favoriteButton: {
    marginTop: 20,
    fontSize: 16,
    color: "#e6639c",
    textDecorationLine: "underline",
  },
});

export default FoodDetailsScreen;
