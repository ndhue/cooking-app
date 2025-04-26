import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export const useFavorites = () => {
  const [favoriteMeals, setFavoriteMeals] = useState<any[]>([]);
  const [favoriteFoods, setFavoriteFoods] = useState<any[]>([]);

  const loadFavorites = async () => {
    const storedMeals = await AsyncStorage.getItem("favoriteMeals");
    const storedFoods = await AsyncStorage.getItem("favoriteFoods");
    setFavoriteMeals(storedMeals ? JSON.parse(storedMeals) : []);
    setFavoriteFoods(storedFoods ? JSON.parse(storedFoods) : []);
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const addFavoriteMeal = async (meal: any) => {
    const updatedMeals = [...favoriteMeals, meal];
    setFavoriteMeals(updatedMeals);
    await AsyncStorage.setItem("favoriteMeals", JSON.stringify(updatedMeals));
  };

  const removeFavoriteMeal = async (mealId: string) => {
    const updatedMeals = favoriteMeals.filter((meal) => meal.idMeal !== mealId);
    setFavoriteMeals(updatedMeals);
    await AsyncStorage.setItem("favoriteMeals", JSON.stringify(updatedMeals));
  };

  const addFavoriteFood = async (food: any) => {
    const updatedFoods = [...favoriteFoods, food];
    setFavoriteFoods(updatedFoods);
    await AsyncStorage.setItem("favoriteFoods", JSON.stringify(updatedFoods));
  };

  const removeFavoriteFood = async (foodName: string) => {
    const updatedFoods = favoriteFoods.filter(
      (food) => food.food_name !== foodName
    );
    setFavoriteFoods(updatedFoods);
    await AsyncStorage.setItem("favoriteFoods", JSON.stringify(updatedFoods));
  };

  const refreshFavorites = () => {
    loadFavorites();
  };

  return {
    favoriteMeals,
    favoriteFoods,
    addFavoriteMeal,
    removeFavoriteMeal,
    addFavoriteFood,
    removeFavoriteFood,
    refreshFavorites,
  };
};
