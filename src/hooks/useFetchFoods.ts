import { useQuery } from "@tanstack/react-query";
import { fetchNutritionData } from "../api/api";

const useFetchFoods = (searchQuery: string) => {
  const {
    data: foodItems,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["foods", searchQuery],
    queryFn: () => fetchNutritionData(searchQuery),
    enabled: !!searchQuery,
  });

  return { foodItems, loading, error: error ? "Error fetching foods" : null };
};

export default useFetchFoods;
