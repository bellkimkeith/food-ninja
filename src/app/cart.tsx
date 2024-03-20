import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useCart } from "@/providers/CartContextProvider";
import CartListItem from "@/components/CartListItem";
import { Stack } from "expo-router";
import CustomButton from "@/components/CustomButton";

const Cart = () => {
  const { cartItems, totalAmount, checkout } = useCart();

  if (cartItems.length === 0) {
    return (
      <>
        <Stack.Screen options={{ title: "Cart" }} />
        <Text style={styles.fallbackText}>Cart empty</Text>
      </>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Cart" }} />
      <FlatList
        data={cartItems}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
      />

      <Text style={styles.totalText}>Total: ₱{totalAmount.toFixed(2)}</Text>
      <CustomButton text="Checkout" onPress={checkout} />

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 5,
  },
  fallbackText: {
    textAlign: "center",
    fontSize: 24,
    marginTop: "50%",
  },
  totalText: {
    fontSize: 24,
  },
});
