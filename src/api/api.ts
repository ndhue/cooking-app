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
