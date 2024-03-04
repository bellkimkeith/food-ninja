import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { products } from "@/assets/data/products";
import CustomButton from "@/components/CustomButton";
import { useCart } from "@/providers/CartContextProvider";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [validUri, setValidUri] = useState(true);
  const { addCartItem } = useCart();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const currentProduct = products.find((product) => product.id === +id);

  const updateQuantityHandler = (action: string) => {
    if (action === "add") {
      if (quantity === 1000) return;
      setQuantity(quantity + 1);
    } else {
      if (quantity === 1) return;
      setQuantity(quantity - 1);
    }
  };

  const addToCartHandler = () => {
    if (!currentProduct) return;
    addCartItem(currentProduct, quantity);
    router.push("/cart");
  };

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
      <View style={styles.quantityContainer}>
        <Text style={styles.quantityText}>Quantity</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => {
            updateQuantityHandler("minus");
          }}
        >
          <Text style={styles.quantityText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => {
            updateQuantityHandler("add");
          }}
        >
          <Text style={styles.quantityText}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.totalText}>
        Total: ₱{(currentProduct.price * quantity).toFixed(2)}
      </Text>
      <CustomButton text="Add to cart" onPress={addToCartHandler} />
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
  quantityContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#eee",
    borderWidth: 1,
    borderColor: "#bbb",
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
  },
  quantityText: {
    fontSize: 28,
  },
  quantityButton: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 12,
  },
  totalText: {
    fontSize: 28,
    marginTop: "auto",
  },
});
