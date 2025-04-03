import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const news = [
  {
    title: "The Pumkins Secrets",
    content: "The Pumkins Secrets",
    image: require("../assets/pumpkin.png"),
  },
  {
    title: "Green Secrets",
    content: "Green Secrets",
    image: require("../assets/green.png"),
  },
];

const News = () => {
  return (
    <View style={styles.screen}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 8 }}>
        News
      </Text>
      <ScrollView
        horizontal
        style={styles.container}
        showsHorizontalScrollIndicator={false}
      >
        {news.map((item, index) => (
          <View key={index} style={styles.newsItem}>
            <Image source={item.image} style={styles.newsImage} />
            <Text style={styles.newsTitle}>{item.title}</Text>
            <Text style={styles.newsContent}>{item.content}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-end",
  },
  container: {
    padding: 16,
  },
  newsItem: {
    marginRight: 16,
    width: 200,
    height: 200,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 8,
    backgroundColor: "#fff",
  },
  newsImage: {
    width: "100%",
    height: 100,
    borderRadius: 4,
  },
  newsTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 8,
  },
  newsContent: {
    fontSize: 14,
    marginTop: 4,
    color: "#555",
  },
});

export default News;
