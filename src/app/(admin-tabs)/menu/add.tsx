import { Alert, Image, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import CustomButton from "@/components/CustomButton";
import Colors from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { products } from "@/assets/data/products";

const AddProductScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState("");
  const [image, setImage] = useState("https://placehold.co/400x400.png");
  const { id } = useLocalSearchParams();
  const currentProduct = products.find((product) => product.id === +id);
  const isEditingProduct = !!id;

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const validateInputs = () => {
    setErrors("");
    if (!name) {
      setErrors("Name is required!");
      return false;
    }
    if (!price) {
      setErrors("Price is requried!");
      return false;
    }
    if (isNaN(parseFloat(price)) || price.split(".").length > 2) {
      setErrors("Price is invalid!");
      return false;
    }
    return true;
  };

  const resetFields = () => {
    setName("");
    setPrice("");
  };

  const submitProductHandler = () => {
    if (isEditingProduct) {
      editProduct();
    } else {
      addProduct();
    }
  };

  const addProduct = () => {
    if (!validateInputs()) return;

    resetFields();
  };

  const editProduct = () => {
    if (!validateInputs()) return;

    resetFields();
  };

  const deleteProduct = () => {
    console.warn("Deleted");
  };

  const deleteProductConfirm = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this product?",
      [
        { text: "Cancel" },
        { text: "Delete", style: "destructive", onPress: deleteProduct },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: isEditingProduct ? "Edit Product" : "Add Product",
          headerBackTitleVisible: false,
        }}
      />
      <Image
        source={{
          uri: currentProduct ? currentProduct.img : image,
        }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.textButton} onPress={pickImage}>
        Pick Image
      </Text>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Ice Cream"
        value={currentProduct ? currentProduct.name : name}
        onChangeText={setName}
      />
      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="1.99"
        value={currentProduct ? currentProduct.price.toString() : price}
        onChangeText={setPrice}
      />
      <Text style={styles.errorText}>{errors}</Text>
      <CustomButton
        text={currentProduct ? "Save" : "Submit"}
        onPress={submitProductHandler}
      />
      {isEditingProduct && (
        <Text
          style={[styles.textButton, { color: "red" }]}
          onPress={deleteProductConfirm}
        >
          Delete
        </Text>
      )}
    </View>
  );
};

export default AddProductScreen;

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
