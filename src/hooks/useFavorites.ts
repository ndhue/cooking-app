import { useEffect, useState } from "react";
import { Meal } from "./useSearchMeals";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Meal[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      setFavorites(storedFavorites ? JSON.parse(storedFavorites) : []);
    };
    loadFavorites();
  }, []);

  const addFavorite = async (meal: Meal) => {
    const updatedFavorites = [...favorites, meal];
    setFavorites(updatedFavorites);
    await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const removeFavorite = async (mealId: string) => {
    const updatedFavorites = favorites.filter((meal) => meal.idMeal !== mealId);
    setFavorites(updatedFavorites);
    await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return { favorites, addFavorite, removeFavorite };
};
