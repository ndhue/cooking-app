import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";

// Helper function to resolve image paths
const getImageSource = (imageName: string) => {
  switch (imageName) {
    case "../assets/fruits.png":
      return require("../assets/fruits.png");
    case "../assets/vegetables.png":
      return require("../assets/vegetables.png");
    case "../assets/snacks.png":
      return require("../assets/snacks.png");
    default:
      return null;
  }
};

const HomeScreen = () => {
  const categories = [
    {
      name: "Fruits",
      image: "../assets/fruits.png",
      color: "#FFE6E6",
    },
    {
      name: "Vegetables",
      image: "../assets/vegetables.png",
      color: "#E6F0FA",
    },
    {
      name: "Snacks",
      image: "../assets/snacks.png",
      color: "#FFF8EB",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Hello Pretty, {"\n"}find, track and eating healthy food
          </Text>
        </View>

        {/* Banner */}
        <Image
          source={require("../assets/banner.png")}
          style={styles.bannerImage}
        />

        {/* Categories Section */}
        <View style={styles.categorySection}>
          <Text style={styles.sectionTitle}>Choose Your Favorites</Text>
          <View style={styles.categoryContainer}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.categoryCard,
                  { backgroundColor: category.color },
                ]}
              >
                <Image
                  source={getImageSource(category.image)}
                  resizeMode="contain"
                  style={styles.categoryImage}
                />
                <Text style={styles.categoryText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  bannerImage: {
    width: "100%",
    height: 200,
  },
  progressSection: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#DDD",
  },
  activeTab: {
    borderBottomColor: "#4CAF50",
  },
  tabText: {
    fontSize: 16,
    color: "#888",
  },
  activeTabText: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
  viewMoreButton: {
    backgroundColor: "#E6E6FA",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  viewMoreText: {
    color: "#4CAF50",
    fontSize: 16,
  },
  categorySection: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryCard: {
    width: "45%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  categoryImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 16,
    color: "#333",
  },
});

export default HomeScreen;
