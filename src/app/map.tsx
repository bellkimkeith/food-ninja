import React, { useEffect, useState } from "react";
import MapView, {
  MapPressEvent,
  Marker,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import {
  Platform,
  Pressable,
  StyleSheet,
  View,
  useColorScheme,
} from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useLocation } from "@/providers/LocationContextProvider";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

export default function Map() {
  const { latitude, longitude } = useLocalSearchParams();
  const { location, updateLocation } = useLocation();
  const colorScheme = useColorScheme();

  const [region, setRegion] = useState({
    latitude: 12.88,
    longitude: 121.77,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    if (!location) {
      const numLat = parseFloat(
        typeof latitude === "string" ? latitude : latitude?.[0]
      );
      const numLng = parseFloat(
        typeof longitude === "string" ? longitude : longitude?.[0]
      );
      updateLocation(numLat, numLng);
    }
  }, []);

  useEffect(() => {
    if (location) {
      setRegion({
        ...region,
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [location, setRegion]);

  const pickLocationHandler = (event: MapPressEvent) => {
    const latitude = event.nativeEvent.coordinate.latitude;
    const longitude = event.nativeEvent.coordinate.longitude;
    updateLocation(latitude, longitude);
  };

  return (
    <View style={styles.container}>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      <Stack.Screen
        options={{
          title: "Map",
          headerRight: () => (
            <Pressable onPress={() => router.back()}>
              {({ pressed }) => (
                <FontAwesome
                  name="save"
                  size={24}
                  color={Colors[colorScheme ?? "light"].text}
                  style={{
                    marginRight: 15,
                    opacity: pressed ? 0.5 : 1,
                  }}
                />
              )}
            </Pressable>
          ),
        }}
      />
      <MapView
        style={styles.map}
        region={region}
        zoomControlEnabled
        showsMyLocationButton
        showsUserLocation
        minZoomLevel={18}
        onPress={pickLocationHandler}
        provider={PROVIDER_GOOGLE}
        zoomEnabled={true}
      >
        {location && (
          <Marker title="Picked Location" coordinate={{ ...location }} />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
