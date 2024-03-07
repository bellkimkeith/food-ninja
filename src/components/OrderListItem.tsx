import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Order } from "@/utils/types";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { Link } from "expo-router";
import { useSegments } from "expo-router";

dayjs.extend(relativeTime);

type OrderListItemProp = {
  order: Order;
};

const OrderListItem = ({ order }: OrderListItemProp) => {
  const segments = useSegments<
    ["(admin-tabs)", "menu", "[id]"] | ["(user-tabs)", "menu", "[id]"]
  >();

  return (
    <Link href={`/${segments[0]}/orders/${order.id}`} asChild>
      <Pressable style={styles.container}>
        <View style={styles.innerContainer}>
          <Text>Order #{order.id}</Text>
          <Text>{dayjs(order.created_at).fromNow()}</Text>
        </View>
        <Text style={styles.statusText}>{order.status}</Text>
      </Pressable>
    </Link>
  );
};

export default OrderListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 12,
  },
  innerContainer: {
    flex: 1,
    gap: 8,
  },
  statusText: {
    alignSelf: "center",
  },
});
