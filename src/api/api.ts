import { NUTRITIONIX_APP_ID, NUTRITIONIX_APP_KEY } from "@env";

export interface NutritionData {
  food_name: string;
  serving_qty: number;
  serving_unit: string;
  serving_weight_grams: number;
  nf_calories: number;
  nf_total_fat: number;
  nf_saturated_fat: number;
  nf_cholesterol: number;
  nf_sodium: number;
  nf_total_carbohydrate: number;
  nf_dietary_fiber: number;
  nf_sugars: number | null;
  nf_protein: number;
  nf_potassium: number;
  photo: {
    thumb: string;
  };
}

export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  [key: string]: any;
}

export const fetchNutritionData = async (query: string) => {
  try {
    if (!NUTRITIONIX_APP_ID || !NUTRITIONIX_APP_KEY) {
      throw new Error("Environment variables are not set correctly.");
    }
    const response = await fetch(
      "https://trackapi.nutritionix.com/v2/natural/nutrients",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-app-id": NUTRITIONIX_APP_ID,
          "x-app-key": NUTRITIONIX_APP_KEY,
        },
        body: JSON.stringify({
          query: query,
        }),
      }
    );

    const result = await response.json();

    if (result.message) {
      console.warn("API response message:", result.message);
      return [];
    }

    const foods = result.foods as NutritionData[];

    return foods;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const fetchMeals = async (query: string) => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
  );

  const data = await response.json();
  return (data.meals as Meal[]) || [];
};

export const fetchMealDetails = async (
  mealId: string
): Promise<Meal | null> => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  const data = await response.json();
  return data.meals ? data.meals[0] : null;
};
