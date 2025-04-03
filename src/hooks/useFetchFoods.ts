import { useState } from "react";
import { fetchNutritionData, NutritionData } from "../api/api";

const useFetchFoods = () => {
  const [foodItems, setFoodItems] = useState<NutritionData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFoods = async (query: string) => {
    if (!query) return null;

    setLoading(true);
    try {
      const data = await fetchNutritionData(query);
      setFoodItems(data);
      setError(null);
    } catch (err) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const clearFoods = () => {
    setFoodItems(null); // Reset food items to null
  };

  return { foodItems, loading, error, fetchFoods, clearFoods };
};

export default useFetchFoods;
