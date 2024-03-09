import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import OrderListItem from "@/components/OrderListItem";
import { orders } from "@/assets/data/orders";

const OrdersScreen = () => {
  const newOrders = orders.filter((order) => order.status !== "Delivered");

  return (
    <View>
      <FlatList
        data={newOrders}
        renderItem={({ item }) => <OrderListItem order={item} />}
        contentContainerStyle={{ margin: 10, gap: 10 }}
      />
    </View>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({});
