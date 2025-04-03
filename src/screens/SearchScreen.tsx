import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useSearchMeals } from "../hooks/useSearchMeals";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/BottomNavigation";

const SearchScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [query, setQuery] = useState("");
  const { data: meals, isLoading, error } = useSearchMeals(query);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput
        style={{
          height: 50,
          borderColor: "#ccc",
          borderWidth: 1,
          paddingHorizontal: 10,
          marginBottom: 10,
          borderRadius: 8,
        }}
        placeholder="Search for a meal..."
        value={query}
        onChangeText={setQuery}
      />
      {isLoading && <Text>Loading...</Text>}
      {error && <Text>Error: {error.message}</Text>}
      <FlatList
        data={meals}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("MealDetail", { mealId: item.idMeal })
            }
          >
            <View
              style={{
                flexDirection: "row",
                marginVertical: 8,
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: item.strMealThumb }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 8,
                  marginRight: 8,
                }}
              />
              <Text style={{ fontSize: 18 }}>{item.strMeal}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SearchScreen;
