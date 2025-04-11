import { useQuery } from "@tanstack/react-query";
import { fetchMeals } from "../api/api";

const useSearchMeals = (searchQuery: string) => {
  const {
    data: meals,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["meals", searchQuery],
    queryFn: () => fetchMeals(searchQuery),
    enabled: !!searchQuery,
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });

  return {
    meals,
    isLoading,
    error: error ? "Error fetching meals" : null,
  };
};

export default useSearchMeals;
