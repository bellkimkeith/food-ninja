import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import { OrderItem, Product } from "@/utils/types";

type OrderItemsListItemProp = {
  orderItem: OrderItem & { products: Product | null };
};

const OrderItemsListItem = ({ orderItem }: OrderItemsListItemProp) => {
  const [validUri, setValidUri] = useState(true);
  return (
    <View style={styles.container}>
      <Image
        onError={() => setValidUri(false)}
        source={{
          uri:
            validUri && orderItem.products?.img !== null
              ? orderItem.products?.img
              : "https://placehold.co/400x400.png",
        }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{orderItem.products?.name}</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.price}>
            ₱
            {(orderItem.products?.price
              ? orderItem.products.price * orderItem.quantity
              : 0
            ).toFixed(2)}
          </Text>
        </View>
      </View>

      <Text style={styles.quantity}>{orderItem.quantity}</Text>
    </View>
  );
};

export default OrderItemsListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 75,
    aspectRatio: 1,
    alignSelf: "center",
    marginRight: 10,
    borderRadius: 6,
  },
  title: {
    fontWeight: "500",
    fontSize: 16,
    marginBottom: 5,
  },
  subtitleContainer: {
    flexDirection: "row",
    gap: 5,
  },
  quantity: {
    fontWeight: "500",
    fontSize: 18,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
  },
});
