import { useLocation } from "@/providers/LocationContextProvider";
import { useCallback, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import {
  Keyboard,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const GooglePlacesInput = () => {
  const { updateAddress, updateLocation, address } = useLocation();

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
        Keyboard.dismiss();
      }}
      query={{
        key: process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY,
        language: "en",
        components: "country:ph",
      }}
      listViewDisplayed="auto"
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
          flex: 0,
        },
        separator: {
          height: 0.3,
          backgroundColor: "#c8c7cc",
        },
      }}
      renderRow={(rowData) => {
        const title = rowData.structured_formatting.main_text;
        const address = rowData.structured_formatting.secondary_text;
        return (
          <View>
            <Text>{title}</Text>
            <Text>{address}</Text>
          </View>
        );
      }}
      textInputProps={{
        value: address,
        onChange: (e) => {
          e.preventDefault();
          handleChange(e);
        },
        autoCorrect: false,
        clearButtonMode: "always",
      }}
    />
  );
};

export default GooglePlacesInput;
