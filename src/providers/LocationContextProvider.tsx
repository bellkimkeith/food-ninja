import { PropsWithChildren, createContext, useContext, useState } from "react";

type LocationData = {
  location: { latitude: number; longitude: number } | null;
  updateLocation: (latitude: number, longitude: number) => void;
  address: string;
  updateAddress: (data: string) => void;
};

const LocationContext = createContext<LocationData>({
  location: { latitude: 0, longitude: 0 },
  updateLocation: () => {},
  address: "",
  updateAddress: () => {},
});

export default function LocationContextProvider({
  children,
}: PropsWithChildren) {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [address, setAddress] = useState("");

  const updateLocation = (latitude: number, longitude: number) => {
    setLocation({ latitude, longitude });
  };

  const updateAddress = (data: string) => {
    setAddress(data);
  };

  return (
    <LocationContext.Provider
      value={{ location, updateLocation, address, updateAddress }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export const useLocation = () => useContext(LocationContext);
