import { useConvertToAddress, useCurrentLocation } from "@/api/location";
import Colors from "@/constants/Colors";
import { useLocation } from "@/providers/LocationContextProvider";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { useEffect } from "react";
import { Pressable, Text, View, useColorScheme } from "react-native";

export default function MenuLayout() {
  const colorScheme = useColorScheme();
  const { data } = useCurrentLocation();
  const { location, address, updateAddress } = useLocation();

  const getFormattedAddress = async (latitude: number, longitude: number) => {
    const formattedAddress = await useConvertToAddress(latitude, longitude);
    updateAddress(formattedAddress);
  };

  useEffect(() => {
    if (location) {
      getFormattedAddress(location.latitude, location.longitude);
    }
  }, [location]);

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
            <View
              style={{
                flex: 1,
                alignItems: "flex-start",
              }}
            >
              {address ? (
                <Text style={{ maxWidth: "78%", paddingHorizontal: 10 }}>
                  {address.length > 70 ? address.slice(0, 70) + "..." : address}
                </Text>
              ) : (
                <Text>No Selected Location</Text>
              )}
            </View>
          ),
          headerLeft: () => (
            <Link
              href={
                data && !location
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
