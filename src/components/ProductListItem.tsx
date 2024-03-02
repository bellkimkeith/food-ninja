import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Product } from "@/utils/types";
import { Link } from "expo-router";

type ProductListItemProps = {
  product: Product;
};

const ProductListItem = ({ product }: ProductListItemProps) => {
  return (
    <Link href={`/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        {product.img && (
          <Image
            source={{ uri: product.img }}
            style={styles.image}
            resizeMode="contain"
          />
        )}
        {(product.img === null || product.img.length === 0) && (
          <View style={styles.fallbackContainer}>
            <Text>No image</Text>
          </View>
        )}
        <Text>{product.name}</Text>
      </Pressable>
    </Link>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    maxWidth: "48%",
    borderRadius: 12,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 12,
    marginBottom: 10,
  },
  fallbackContainer: {
    flex: 1,
    backgroundColor: "gray",
    borderRadius: 12,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
