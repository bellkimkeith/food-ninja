import { PropsWithChildren, createContext, useContext, useState } from "react";

type LocationData = {
  location: { latitude: number; longitude: number } | null;
  updateLocation: (latitude: number, longitude: number) => void;
};

const LocationContext = createContext<LocationData>({
  location: { latitude: 0, longitude: 0 },
  updateLocation: () => {},
});

export default function LocationContextProvider({
  children,
}: PropsWithChildren) {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const updateLocation = (latitude: number, longitude: number) => {
    setLocation({ latitude, longitude });
  };

  return (
    <LocationContext.Provider value={{ location, updateLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

export const useLocation = () => useContext(LocationContext);
