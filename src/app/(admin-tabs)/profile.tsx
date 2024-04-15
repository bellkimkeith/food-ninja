import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
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
import { useAuth } from "@/providers/AuthContextProvider";
import { useUpdateProfile } from "@/api/profiles";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [errors, setErrors] = useState("");
  const [image, setImage] = useState<string | null>(
    "https://placehold.co/400x400.png"
  );
  const [pickedAnImage, setPickedAnImage] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const { profile } = useAuth();
  const { mutate: editUserProfile, isPending } = useUpdateProfile();
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (profile) {
      if (!profile.full_name) {
        setName("");
      } else {
        setName(profile.full_name);
      }
      setImage(profile.avatar_url);
    }
  }, [profile]);

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

    editUserProfile(
      {
        full_name: name,
        avatar_url: pickedAnImage ? imagePath : image,
      },
      {
        onSuccess: (data) => {
          if (!data) return;
          if (!data.full_name) {
            setName("");
          } else {
            setName(data.full_name);
          }
          setIsEditingProfile(!isEditingProfile);
        },
      }
    );
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
      .from("avatars")
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
            <Pressable
              onPress={() => {
                setErrors("");
                if (isEditingProfile && !errors) submitProfileHandler();
                if (!isEditingProfile && !errors)
                  setIsEditingProfile(!isEditingProfile);
              }}
              disabled={isPending}
            >
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
      <View style={styles.formContainer}>
        {profile && !pickedAnImage ? (
          <RemoteImage
            path={image}
            fallback="https://placehold.co/400x400.png"
            imageType="profile"
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
        {isEditingProfile && (
          <Text
            style={[styles.textButton, !isEditingProfile && { color: "#ccc" }]}
            onPress={pickImage}
            disabled={!isEditingProfile}
          >
            Change Image
          </Text>
        )}

        <TextInput
          style={[
            styles.input,
            isEditingProfile && { borderWidth: 4, borderColor: "lightblue" },
          ]}
          placeholder="Add Name"
          value={name}
          onChangeText={setName}
          autoCorrect={false}
          editable={isEditingProfile}
        />
        <Text style={styles.errorText}>{errors}</Text>
      </View>
      {!isEditingProfile && (
        <View>
          <CustomButton
            onPress={async () => {
              await supabase.auth.signOut();
            }}
            text="Sign out"
            disabled={isPending}
          />
        </View>
      )}
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
    marginBottom: 10,
  },
  textButton: {
    fontSize: 18,
    color: Colors.light.tint,
    textAlign: "center",
    marginVertical: 10,
  },
  formContainer: {
    flex: 1,
  },
});
