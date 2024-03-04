import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { products } from "@/assets/data/products";
import { useCart } from "@/providers/CartContextProvider";

const ProductDetails = () => {
  const [validUri, setValidUri] = useState(true);
  const router = useRouter();
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
    <View style={styles.container}>
      <Stack.Screen options={{ title: currentProduct.name }} />
      <Image
        onError={() => setValidUri(false)}
        source={{
          uri: validUri
            ? currentProduct.img
            : "https://placehold.co/400x400.png",
        }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.priceText}>₱{currentProduct.price.toFixed(2)}</Text>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  priceText: {
    fontSize: 28,
    textAlign: "center",
    backgroundColor: "#eee",
    padding: 10,
    borderWidth: 1,
    borderColor: "#bbb",
  },
});
