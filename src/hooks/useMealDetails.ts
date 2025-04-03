import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Meal } from "./useSearchMeals";

export const useMealDetails = (mealId: string) => {
  return useQuery({
    queryKey: ["mealDetails", mealId],
    queryFn: async () => {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
      );
      return response.data.meals[0] as Meal;
    },
  });
};
