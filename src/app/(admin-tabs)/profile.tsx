import {
  Alert,
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import CustomButton from "@/components/CustomButton";
import Colors from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { randomUUID } from "expo-crypto";
import { supabase } from "@/lib/supabase";
import { decode } from "base64-arraybuffer";
import RemoteImage from "@/components/RemoteImage";
import { Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [errors, setErrors] = useState("");
  const [image, setImage] = useState<string | null>(
    "https://placehold.co/400x400.png"
  );
  const [pickedAnImage, setPickedAnImage] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const router = useRouter();
  const colorScheme = useColorScheme();

  // change to current profile

  //   useEffect(() => {
  //     if (currentProduct) {
  //       setName(currentProduct.name);
  //       setImage(currentProduct.img);
  //     }
  //   }, [currentProduct]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPickedAnImage(true);
      setImage(result.assets[0].uri);
    }
  };

  const validateInputs = () => {
    setErrors("");
    if (!name) {
      setErrors("Name is required!");
      return false;
    }

    if (name.length < 2) {
      setErrors("Name is too short!");
      return false;
    }

    if (name.match(/^[A-Za-z] [A-Za-z]+$/)) {
      setErrors("Name can't contain number!");
      return false;
    }

    return true;
  };

  const submitProfileHandler = () => {
    editProfile();
  };

  const editProfile = async () => {
    if (!validateInputs()) return;
    let imagePath: string | undefined = "";

    if (pickedAnImage) imagePath = await uploadImage();

    router.back();
    // change to update profile instead

    // updateProduct({
    //   id: parseInt(typeof id === "string" ? id : id[0]),
    //   data: {
    //     name,
    //     price: parseFloat(price),
    //     img: pickedAnImage ? imagePath : image,
    //   },
    // });
  };

  const uploadImage = async () => {
    if (!image?.startsWith("file://")) {
      return;
    }

    const base64 = await FileSystem.readAsStringAsync(image, {
      encoding: "base64",
    });
    const filePath = `${randomUUID()}.png`;
    const contentType = "image/png";
    const { data, error } = await supabase.storage
      // change to avatar-images
      .from("product-images")
      .upload(filePath, decode(base64), { contentType });

    if (data) {
      return data.path;
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerBackTitleVisible: false,
          headerRight: () => (
            <Pressable onPress={submitProfileHandler}>
              {({ pressed }) => (
                <FontAwesome
                  name={isEditingProfile ? "save" : "pencil"}
                  size={24}
                  color={Colors[colorScheme ?? "light"].text}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          ),
        }}
      />
      {isEditingProfile && !pickedAnImage ? (
        <RemoteImage
          path={image}
          fallback="https://placehold.co/400x400.png"
          style={styles.image}
          resizeMode="contain"
        />
      ) : (
        <Image
          source={{
            uri: image === null ? "https://placehold.co/400x400.png" : image,
          }}
          style={styles.image}
          resizeMode="contain"
        />
      )}
      <Text style={styles.textButton} onPress={pickImage}>
        Change Image
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Add Name"
        value={name}
        onChangeText={setName}
        autoCorrect={false}
        editable={isEditingProfile}
      />
      <Text style={styles.errorText}>{errors}</Text>
      <CustomButton
        onPress={async () => {
          await supabase.auth.signOut();
        }}
        text="Sign out"
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  label: {
    fontSize: 18,
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 16,
    paddingHorizontal: 10,
    marginTop: 8,
    marginBottom: 20,
    borderRadius: 8,
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
  image: {
    alignSelf: "center",
    width: "50%",
    aspectRatio: 1,
    borderRadius: 12,
  },
  textButton: {
    fontSize: 18,
    color: Colors.light.tint,
    textAlign: "center",
    marginVertical: 10,
  },
});
