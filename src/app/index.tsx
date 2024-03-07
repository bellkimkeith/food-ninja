import { View } from "react-native";
import React from "react";
import CustomButton from "../components/CustomButton";
import { Link } from "expo-router";

const index = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Link href={"/(user-tabs)"} asChild>
        <CustomButton text="User" />
      </Link>
      <Link href={"/(admin-tabs)"} asChild>
        <CustomButton text="Admin" />
      </Link>
      <Link href={"/sign-in"} asChild>
        <CustomButton text="Sign in" />
      </Link>
    </View>
  );
};

export default index;
