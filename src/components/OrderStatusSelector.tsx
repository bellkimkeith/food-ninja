import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Order, OrderStatusList } from "@/utils/types";
import Colors from "@/constants/Colors";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useUpdateOrder } from "@/api/orders";
import { notifyUserOnOrderUpdate } from "@/lib/notifications";

type OrderStatusSelectorProp = {
  order: Order;
};

dayjs.extend(relativeTime);

const OrderStatusSelector = ({ order }: OrderStatusSelectorProp) => {
  const { mutate: updateOrder } = useUpdateOrder();

  const updateStatusHandler = async (status: string) => {
    if (
      dayjs().isAfter(order.created_at, "day") &&
      order.status === "Delivered"
    )
      return;
    updateOrder({
      id: order.id,
      data: { status },
    });
    await notifyUserOnOrderUpdate({ ...order, status });
  };

  return (
    <>
      <Text style={{ fontWeight: "bold" }}>Status</Text>
      <View style={{ flexDirection: "row", gap: 5 }}>
        {OrderStatusList.map((status) => (
          <Pressable
            key={status}
            onPress={() => {
              updateStatusHandler(status);
            }}
            style={[
              styles.button,
              {
                backgroundColor:
                  order.status === status ? Colors.light.tint : "transparent",
              },
            ]}
          >
            <Text
              style={{
                color: order.status === status ? "white" : Colors.light.tint,
              }}
            >
              {status}
            </Text>
          </Pressable>
        ))}
      </View>
    </>
  );
};

export default OrderStatusSelector;

const styles = StyleSheet.create({
  button: {
    borderColor: Colors.light.tint,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
});
