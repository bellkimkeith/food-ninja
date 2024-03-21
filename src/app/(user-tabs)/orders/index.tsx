import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import OrderListItem from "@/components/OrderListItem";
import { useMyOrderList } from "@/api/orders";
import { useUpdateOrdersSubscription } from "@/api/orders/subscriptions";

const OrdersScreen = () => {
  const { data: orders, error, isLoading } = useMyOrderList();
  useUpdateOrdersSubscription();

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch orders. {error.message}</Text>;
  }

  return (
    <View>
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item} />}
        contentContainerStyle={{ margin: 10, gap: 10 }}
      />
    </View>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({});
