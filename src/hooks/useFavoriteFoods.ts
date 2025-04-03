import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { NutritionData } from "../api/api";

const FAVORITES_KEY = "@favorite_foods";

const useFavoriteFoods = () => {
  const [favorites, setFavorites] = useState<NutritionData[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(FAVORITES_KEY);
      if (jsonValue != null) {
        setFavorites(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error("Failed to load favorites", e);
    }
  };

  const saveFavorites = async (newFavorites: NutritionData[]) => {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (e) {
      console.error("Failed to save favorites", e);
    }
  };

  const addFavorite = async (food: NutritionData) => {
    const updatedFavorites = [...favorites, food];
    await saveFavorites(updatedFavorites);
  };

  const removeFavorite = async (foodName: string) => {
    const updatedFavorites = favorites.filter((f) => f.food_name !== foodName);
    await saveFavorites(updatedFavorites);
  };

  const isFavorite = (foodName: string) => {
    return favorites.some((f) => f.food_name === foodName);
  };

  return { favorites, addFavorite, removeFavorite, isFavorite };
};

export default useFavoriteFoods;
