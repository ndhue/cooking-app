import { useState } from "react";

const useSearchMeals = () => {
  const [meals, setMeals] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMeals = async (query: string) => {
    if (!query) return null;

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data = await response.json();
      setMeals(data.meals || []);
      setError(null);
    } catch (err) {
      setError("Error fetching meals");
    } finally {
      setIsLoading(false);
    }
  };

  const clearMeals = () => {
    setMeals(null); // Reset meals to null
  };

  return { meals, isLoading, error, fetchMeals, clearMeals };
};

export default useSearchMeals;
