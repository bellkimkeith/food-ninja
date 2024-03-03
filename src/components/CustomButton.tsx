import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../constants/Colors";
import { forwardRef } from "react";

type CustomButtonProps = {
  text: string;
} & React.ComponentPropsWithoutRef<typeof Pressable>;

const CustomButton = forwardRef<View | null, CustomButtonProps>(
  ({ text, ...pressableProps }, ref) => {
    return (
      <Pressable
        ref={ref}
        {...pressableProps}
        style={({ pressed }) => [styles.container, pressed && { opacity: 0.7 }]}
      >
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.tint,
    padding: 15,
    alignItems: "center",
    borderRadius: 100,
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});

export default CustomButton;
