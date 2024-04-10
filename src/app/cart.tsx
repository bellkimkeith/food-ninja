import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useCart } from "@/providers/CartContextProvider";
import CartListItem from "@/components/CartListItem";
import { Stack } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { useLocation } from "@/providers/LocationContextProvider";

const Cart = () => {
  const { cartItems, totalAmount, checkout } = useCart();
  const { address } = useLocation();

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

      <Text style={styles.bottomText}>
        Address: {address.length > 70 ? address.slice(0, 70) + "..." : address}
      </Text>
      <Text style={styles.bottomText}>Phone: </Text>
      <Text style={styles.bottomText}>Total: ₱{totalAmount.toFixed(2)}</Text>
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
  bottomText: {
    fontSize: 24,
    backgroundColor: "#fff",
    padding: 5,
  },
});
