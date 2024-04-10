import { useLocation } from "@/providers/LocationContextProvider";
import { useCallback, useState } from "react";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const GooglePlacesInput = () => {
  const { updateAddress, updateLocation, address } = useLocation();
  const [searchText, setSearchText] = useState("");

  const handleChange = useCallback(
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
      updateAddress(event.nativeEvent.text);
    },
    []
  );

  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
      onPress={(data, details) => {
        updateAddress(data.description);
        if (details) {
          updateLocation(
            details.geometry.location.lat,
            details.geometry.location.lng
          );
        }
      }}
      query={{
        key: process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY,
        language: "en",
        components: "country:ph",
      }}
      fetchDetails={true}
      enablePoweredByContainer={false}
      styles={{
        textInput: {
          borderWidth: 0.2,
          marginHorizontal: 5,
        },
        listView: {
          marginRight: 8,
        },
        container: {
          borderRadius: 8,
        },
      }}
      textInputProps={{
        value: address,
        onChange: (e) => {
          e.preventDefault();
          handleChange(e);
        },
        autoCorrect: false,
      }}
    />
  );
};

export default GooglePlacesInput;
