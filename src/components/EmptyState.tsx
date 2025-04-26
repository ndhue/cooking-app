import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const EmptyState = ({
  title,
  subtitle,
  buttonText,
  onButtonPress,
}: {
  title: string;
  subtitle: string;
  buttonText: string;
  onButtonPress: () => void;
}) => (
  <View
    style={{
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
      paddingHorizontal: 20,
    }}
  >
    <Image
      source={require("../assets/no-food.png")}
      style={{ width: 120, height: 120, marginBottom: 20 }}
      resizeMode="contain"
    />
    <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 10 }}>
      {title}
    </Text>
    <Text style={{ textAlign: "center", color: "#777", marginBottom: 20 }}>
      {subtitle}
    </Text>
    <TouchableOpacity
      style={{
        backgroundColor: "#9FD29C",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
      }}
      onPress={onButtonPress}
    >
      <Text style={{ color: "white", fontWeight: "600" }}>{buttonText}</Text>
    </TouchableOpacity>
  </View>
);

export default EmptyState;
