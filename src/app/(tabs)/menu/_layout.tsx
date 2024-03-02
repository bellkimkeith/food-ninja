import { Stack } from "expo-router";

export default function MenuLayout() {
  return (
    <Stack screenOptions={{ headerTintColor: "black" }}>
      <Stack.Screen name="index" options={{ title: "Menu" }} />
    </Stack>
  );
}
