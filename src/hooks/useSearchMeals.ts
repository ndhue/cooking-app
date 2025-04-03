import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  [key: string]: any;
}

export interface Ingredient {
  ingredient: string;
  measure: string;
}


export const useSearchMeals = (query: string) =>
  useQuery({
    queryKey: ["meals", query],
    queryFn: async () => {
      if (!query) return [];
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      return response.data.meals || [];
    },
    enabled: !!query,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
