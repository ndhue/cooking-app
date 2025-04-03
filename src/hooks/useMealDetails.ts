import axios from "axios";
import { useEffect, useState } from "react";

const useMealDetails = (mealId: string) => {
  const [meal, setMeal] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mealId) return;

    const fetchMealDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
        );
        setMeal(response.data.meals[0] || null);
        setError(null);
      } catch (err) {
        setError("Failed to fetch meal details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMealDetails();
  }, [mealId]);

  return { meal, isLoading, error };
};

export default useMealDetails;
