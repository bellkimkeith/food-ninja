import { useCurrentLocation } from "@/api/location";
import Colors from "@/constants/Colors";
import { useLocation } from "@/providers/LocationContextProvider";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Pressable, Text, View, useColorScheme } from "react-native";

export default function MenuLayout() {
  const colorScheme = useColorScheme();
  const { data } = useCurrentLocation();
  const { location } = useLocation();

  return (
    <Stack
      screenOptions={{
        headerTintColor: "black",
        headerRight: () => (
          <Link href="/cart" asChild>
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  name="shopping-cart"
                  size={24}
                  color={Colors[colorScheme ?? "light"].text}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        ),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: () => (
            <View style={{ alignItems: "center" }}>
              <Text>Menu</Text>
              {location ? (
                <Text>{location.latitude}</Text>
              ) : (
                data && <Text>{data.latitude}</Text>
              )}
            </View>
          ),
          headerLeft: () => (
            <Link
              href={
                data
                  ? {
                      pathname: "/map",
                      params: {
                        latitude: data.latitude,
                        longitude: data.longitude,
                      },
                    }
                  : { pathname: "/map" }
              }
              asChild
            >
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="map-marker"
                    size={24}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
    </Stack>
  );
}
