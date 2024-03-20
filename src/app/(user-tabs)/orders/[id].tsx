import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import OrderListItem from "@/components/OrderListItem";
import OrderItemsListItem from "@/components/OrderItemsListItem";
import { useOrder } from "@/api/orders";

const OrderDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const {
    data: currentOrder,
    isLoading,
    error,
  } = useOrder(parseInt(typeof id === "string" ? id : id[0]));

  if (isLoading) {
    return (
      <>
        <Stack.Screen options={{ title: "" }} />
        <ActivityIndicator />
      </>
    );
  }

  if (error || !currentOrder) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Stack.Screen options={{ title: "" }} />
        <Text>No order details</Text>
      </View>
    );
  }

  return (
    <View>
      <Stack.Screen options={{ title: `Order #${id}` }} />

      <FlatList
        data={currentOrder.order_items}
        renderItem={({ item }) => <OrderItemsListItem orderItem={item} />}
        contentContainerStyle={{ gap: 10, margin: 10 }}
        ListHeaderComponent={() => <OrderListItem order={currentOrder} />}
      />
    </View>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({});
