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
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });

  return { foodItems, loading, error: error ? "Error fetching foods" : null };
};

export default useFetchFoods;
