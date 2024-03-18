import { Alert, Image, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import CustomButton from "@/components/CustomButton";
import Colors from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { products } from "@/assets/data/products";
import {
  useDeleteProduct,
  useInsertProduct,
  useProduct,
  useUpdateProduct,
} from "@/api/products";

const AddProductScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState("");
  const [image, setImage] = useState<string | null>(
    "https://placehold.co/400x400.png"
  );
  const { id } = useLocalSearchParams();
  const isEditingProduct = !!id;
  const { mutate: insertProduct, isPending: insertPending } =
    useInsertProduct();
  const { mutate: updateProduct, isPending: updatePending } =
    useUpdateProduct();
  const { data: currentProduct } = useProduct(
    parseInt(typeof id === "string" ? id : id?.[0])
  );
  const { mutate: deleteProduct, isPending: deletePending } =
    useDeleteProduct();
  const router = useRouter();

  useEffect(() => {
    if (currentProduct) {
      setName(currentProduct.name);
      setImage(currentProduct.img);
      setPrice(currentProduct.price.toString());
    }
  }, [currentProduct]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

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

    insertProduct(
      { name, price: parseFloat(price), img: image },
      {
        onSuccess: () => {
          resetFields();
          router.back();
        },
      }
    );
  };

  const editProduct = () => {
    if (!validateInputs()) return;

    updateProduct(
      {
        id: parseInt(typeof id === "string" ? id : id[0]),
        name,
        price: parseFloat(price),
        img: image,
      },
      {
        onSuccess: () => {
          resetFields();
          router.back();
        },
      }
    );
  };

  const onDeleteHandler = () => {
    deleteProduct(parseInt(typeof id === "string" ? id : id[0]), {
      onSuccess: () => {
        resetFields();
        router.replace("/(admin-tabs)");
      },
    });
  };

  const deleteProductConfirm = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this product?",
      [
        { text: "Cancel" },
        { text: "Delete", style: "destructive", onPress: onDeleteHandler },
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
          uri: image === null ? "https://placehold.co/400x400.png" : image,
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
        value={name}
        onChangeText={setName}
        autoCorrect={false}
      />
      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="1.99"
        value={price}
        onChangeText={setPrice}
      />
      <Text style={styles.errorText}>{errors}</Text>
      <CustomButton
        text={currentProduct ? "Save" : "Submit"}
        onPress={submitProductHandler}
        disabled={insertPending || updatePending || deletePending}
      />
      {isEditingProduct && (
        <Text
          style={[styles.textButton, { color: "red" }]}
          onPress={deleteProductConfirm}
          disabled={insertPending || updatePending || deletePending}
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
