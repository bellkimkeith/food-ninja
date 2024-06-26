import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { useColorScheme } from "@/components/useColorScheme";
import CartContextProvider from "@/providers/CartContextProvider";
import AuthContextProvider from "@/providers/AuthContextProvider";
import QueryProvider from "@/providers/QueryProvider";
import NotificationProvider from "@/providers/NotificationProvider";
import LocationContextProvider from "@/providers/LocationContextProvider";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(user-tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AuthContextProvider>
        <QueryProvider>
          <NotificationProvider>
            <LocationContextProvider>
              <CartContextProvider>
                <Stack>
                  <Stack.Screen name="index" options={{ headerShown: false }} />
                  <Stack.Screen
                    name="(admin-tabs)"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="(user-tabs)"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="(auth)"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="cart"
                    options={{ presentation: "modal" }}
                  />
                  <Stack.Screen
                    name="map"
                    options={{
                      presentation: "fullScreenModal",
                      headerBackVisible: false,
                    }}
                  />
                </Stack>
              </CartContextProvider>
            </LocationContextProvider>
          </NotificationProvider>
        </QueryProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
}
