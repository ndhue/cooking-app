import { useEffect, useState } from "react";
import { fetchMealDetails, Meal } from "../api/api";

const useMealDetails = (mealId: string) => {
  const [meal, setMeal] = useState<Meal | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mealId) return;

    const loadMealDetails = async () => {
      setIsLoading(true);
      try {
        const data = await fetchMealDetails(mealId);
        setMeal(data || null);
        setError(null);
      } catch (err) {
        setError("Failed to fetch meal details");
      } finally {
        setIsLoading(false);
      }
    };

    loadMealDetails();
  }, [mealId]);

  return { meal, isLoading, error };
};

export default useMealDetails;
