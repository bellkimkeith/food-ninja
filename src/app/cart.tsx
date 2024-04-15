import {
  Alert,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useCart } from "@/providers/CartContextProvider";
import CartListItem from "@/components/CartListItem";
import { Stack, router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { useLocation } from "@/providers/LocationContextProvider";
import { useAuth } from "@/providers/AuthContextProvider";
import { FontAwesome } from "@expo/vector-icons";

const Cart = () => {
  const { cartItems, totalAmount, checkout } = useCart();
  const { address } = useLocation();
  const { profile } = useAuth();

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
      <View style={styles.bottomFields}>
        <Text style={styles.bottomText}>
          Address:{" "}
          {address
            ? address.length > 70
              ? address.slice(0, 70) + "..."
              : address
            : "Add an address"}
        </Text>
        <FontAwesome
          onPress={() => {
            router.push("/map");
          }}
          name="pencil"
          color="gray"
          size={16}
          style={{ paddingRight: 15 }}
        />
      </View>

      <View style={styles.bottomFields}>
        <Text style={styles.bottomText}>
          Phone: {profile && profile.phone ? profile.phone : "Add phone number"}
        </Text>
        {profile && !profile.phone && (
          <FontAwesome
            onPress={() => {
              router.dismiss();
              router.push("/(user-tabs)/profile");
            }}
            name="pencil"
            color="gray"
            size={16}
            style={{ paddingRight: 15 }}
          />
        )}
      </View>

      <Text style={styles.bottomText}>Total: ₱{totalAmount.toFixed(2)}</Text>
      <CustomButton
        text="Checkout"
        onPress={() => {
          if (!profile?.phone || !address) {
            Alert.alert(
              "Checkout failed",
              "Please provide missing details to proceed",
              [{ text: "Close", style: "cancel" }],
              { cancelable: true }
            );
          } else {
            checkout();
          }
        }}
      />

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    margin: 5,
    gap: 1,
  },
  fallbackText: {
    textAlign: "center",
    fontSize: 24,
    marginTop: "50%",
  },
  bottomText: {
    fontSize: 16,
    backgroundColor: "#fff",
    padding: 5,
  },
  bottomFields: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 5,
  },
});
