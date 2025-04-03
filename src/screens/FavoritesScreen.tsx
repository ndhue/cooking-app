import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useFavorites } from "../hooks/useFavorites";

const FavoritesScreen = () => {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              marginVertical: 8,
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: item.strMealThumb }}
              style={{ width: 80, height: 80, borderRadius: 8, marginRight: 8 }}
            />
            <Text style={{ fontSize: 18, flex: 1 }}>{item.strMeal}</Text>
            <TouchableOpacity
              onPress={() => removeFavorite(item.idMeal)}
              style={{
                backgroundColor: "#FF6347",
                padding: 8,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: "#fff" }}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default FavoritesScreen;
