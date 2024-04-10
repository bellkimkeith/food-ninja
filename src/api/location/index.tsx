import { useLocation } from "@/providers/LocationContextProvider";
import { useQuery } from "@tanstack/react-query";
import * as Location from "expo-location";

export const useCurrentLocation = () => {
  const { updateAddress } = useLocation();
  return useQuery({
    queryKey: ["currentLocation"],
    queryFn: async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        throw new Error("Permission to access location was denied");
      }
      const { coords } = await Location.getCurrentPositionAsync({});

      // const formattedAddress = await useConvertToAddress(latitude, longitude);
      // updateAddress(formattedAddress);

      if (coords) {
        const formattedAddress = await useConvertToAddress(
          coords.latitude,
          coords.longitude
        );
        updateAddress(formattedAddress);
      }

      return coords;
    },
  });
};

export const useConvertToAddress = async (
  latitude: number,
  longitude: number
) => {
  const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY}`;
  const response = await fetch(geocodingUrl);

  if (!response.ok) {
    throw new Error("Failed to get address");
  }
  const json = await response.json();
  const formattedAddress = json.results[0].formatted_address;

  return formattedAddress;
};
