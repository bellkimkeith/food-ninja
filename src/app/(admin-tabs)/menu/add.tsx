import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import CustomButton from "@/components/CustomButton";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState("");

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
    if (!validateInputs()) return;

    resetFields();
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Add Product" }} />
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Jon Snow"
        value={name}
        onChangeText={setName}
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
      <CustomButton text="Submit" onPress={submitProductHandler} />
    </View>
  );
};

export default AddProduct;

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
});
