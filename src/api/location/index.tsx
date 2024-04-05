import { useQuery } from "@tanstack/react-query";
import * as Location from "expo-location";

export const useCurrentLocation = () => {
  return useQuery({
    queryKey: ["currentLocation"],
    queryFn: async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        throw new Error("Permission to access location was denied");
      }
      const { coords } = await Location.getCurrentPositionAsync({});

      return coords;
    },
  });
};
