import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import OrderListItem from "@/components/OrderListItem";
import { orders } from "@/assets/data/orders";
import OrderItemsListItem from "@/components/OrderItemsListItem";
import OrderStatusSelector from "@/components/OrderStatusSelector";

const OrderDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const currentOrder = orders.find((order) => order.id.toString() === id);

  if (!currentOrder) {
    return <Text>No order details</Text>;
  }

  return (
    <View>
      <Stack.Screen options={{ title: `Order #${id}` }} />

      <FlatList
        data={currentOrder.order_items}
        renderItem={({ item }) => <OrderItemsListItem orderItem={item} />}
        contentContainerStyle={{ gap: 10, margin: 10 }}
        ListHeaderComponent={() => <OrderListItem order={currentOrder} />}
        ListFooterComponent={() => <OrderStatusSelector order={currentOrder} />}
      />
    </View>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({});
