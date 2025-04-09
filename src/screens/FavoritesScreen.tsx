import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useWindowDimensions } from "react-native";
import { useFavorites } from "../hooks/useFavorites";

const FavoriteFoodTab = () => {
  const { favorites, removeFavorite } = useFavorites();

  if (favorites.length === 0) {
    return (
      <View style={styles.centered}>
        <Image
          source={require("../assets/no-food.png")}
          style={{ width: 140, height: 140 }}
        />
        <Text style={styles.noText}>No Foods Found</Text>
        <Text style={styles.desc}>
          You don’t save any food. Go ahead, search and save your favorite food
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.idMeal}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Image source={{ uri: item.strMealThumb }} style={styles.itemImage} />
          <Text style={styles.itemText}>{item.strMeal}</Text>
          <TouchableOpacity onPress={() => removeFavorite(item.idMeal)}>
            <Text style={styles.removeButton}>Remove</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

const FavoriteRecipesTab = () => {
  // Placeholder for recipes feature
  return (
    <View style={styles.centered}>
      <Image
        source={require("../assets/no-food.png")}
        style={{ width: 140, height: 140 }}
      />
      <Text style={styles.noText}>No Recipes Found</Text>
      <Text style={styles.desc}>
        You don’t save any recipes. Go ahead, search and save your favorite
        recipe
      </Text>
    </View>
  );
};

const FavoritesScreen = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "food", title: "Food" },
    { key: "recipes", title: "Recipes" },
  ]);

  const renderScene = SceneMap({
    food: FavoriteFoodTab,
    recipes: FavoriteRecipesTab,
  });

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => {
          return (
            <View style={styles.customTabBarContainer}>
              {props.navigationState.routes.map((route, i) => {
                const isActive = props.navigationState.index === i;
                return (
                  <TouchableOpacity
                    key={route.key}
                    onPress={() => props.jumpTo(route.key)}
                    style={[styles.tabItem, isActive && styles.activeTabItem]}
                  >
                    <Text
                      style={[styles.tabText, isActive && styles.activeTabText]}
                    >
                      {route.title}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        }}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>
            Search {index === 0 ? "Food" : "Recipes"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  noText: {
    fontSize: 16,
    fontWeight: 600,
    marginVertical: 8,
    color: "#696969",
  },
  desc: {
    fontSize: 12,
    color: "#696969",
    textAlign: "center",
    paddingHorizontal: 8,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  itemText: {
    fontSize: 18,
    flex: 1,
  },
  removeButton: {
    color: "red",
    fontWeight: "bold",
  },
  buttonContainer: {
    padding: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  searchButton: {
    backgroundColor: "#91C788",
    padding: 12,
    borderRadius: 16,
    alignItems: "center",
    width: "70%",
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  customTabBarContainer: {
    flexDirection: "row",
    margin: 16,
    backgroundColor: "#FFF8EE",
    borderRadius: 24,
    padding: 4,
    justifyContent: "space-between",
  },

  tabItem: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 24,
  },

  activeTabItem: {
    backgroundColor: "#FF9385",
  },

  tabText: {
    color: "#FF8473",
    fontWeight: "500",
  },

  activeTabText: {
    color: "#FFFFFF",
  },
});

export default FavoritesScreen;
