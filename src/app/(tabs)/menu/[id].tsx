import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { products } from "@/assets/data/products";

const ProductDetails = () => {
  const { id } = useLocalSearchParams();
  const currentProduct = products.find((product) => product.id === +id);

  if (!currentProduct) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No product details</Text>
      </View>
    );
  }

  return (
    <View>
      <Stack.Screen options={{ title: currentProduct.name }} />
      <Text>{currentProduct.name}</Text>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({});
