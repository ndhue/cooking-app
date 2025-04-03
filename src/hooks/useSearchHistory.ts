import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const HISTORY_KEY = "@search_history";

const useSearchHistory = () => {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const storedHistory = await AsyncStorage.getItem(HISTORY_KEY);
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error("Failed to load search history", error);
    }
  };

  const addToHistory = async (term: string) => {
    try {
      const newHistory = [
        term,
        ...history.filter((item) => item !== term),
      ].slice(0, 10); // Giới hạn 10 từ
      setHistory(newHistory);
      await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
    } catch (error) {
      console.error("Failed to save search term", error);
    }
  };

  const clearHistory = async () => {
    try {
      await AsyncStorage.removeItem(HISTORY_KEY);
      setHistory([]);
    } catch (error) {
      console.error("Failed to clear search history", error);
    }
  };

  return { history, addToHistory, clearHistory };
};

export default useSearchHistory;
