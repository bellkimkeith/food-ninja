import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Order, OrderStatusList } from "@/utils/types";
import Colors from "@/constants/Colors";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

type OrderStatusSelectorProp = {
  order: Order;
};

dayjs.extend(relativeTime);

const OrderStatusSelector = ({ order }: OrderStatusSelectorProp) => {
  const updateStatusHandler = () => {
    if (
      dayjs().isAfter(order.created_at, "day") &&
      order.status === "Delivered"
    )
      return;
    console.log("Status Updated");
  };

  return (
    <>
      <Text style={{ fontWeight: "bold" }}>Status</Text>
      <View style={{ flexDirection: "row", gap: 5 }}>
        {OrderStatusList.map((status) => (
          <Pressable
            key={status}
            onPress={updateStatusHandler}
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
