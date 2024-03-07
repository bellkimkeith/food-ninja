import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import { Stack, router } from "expo-router";
import CustomButton from "@/components/CustomButton";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const validateInputs = () => {
    setErrors("");
    if (!email) {
      setErrors("Email is required!");
      return false;
    }
    if (!email.match(emailRegex)) {
      setErrors("Email is invalid!");
      return false;
    }
    if (!password) {
      setErrors("Password is requried!");
      return false;
    }
    if (password.length < 8) {
      setErrors("Password too short. Must be at least 8 characters!");
      return false;
    }
    return true;
  };

  const onSubmitHandler = () => {
    if (!validateInputs()) return;
    console.warn("Submitted");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Sign Up",
          headerBackTitleVisible: false,
        }}
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        keyboardType="email-address"
        placeholder="jonsnow@example.com"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        secureTextEntry={true}
      />
      <Text style={styles.errorText}>{errors}</Text>
      <CustomButton text={"Create Account"} onPress={onSubmitHandler} />
      <Text
        style={styles.textButton}
        onPress={() => {
          router.navigate("/sign-in");
        }}
      >
        Sign In
      </Text>
    </View>
  );
};

export default SignUp;

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
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.light.tint,
    textAlign: "center",
    marginVertical: 10,
  },
});
