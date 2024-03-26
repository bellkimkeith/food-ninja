import { ActivityIndicator, Text } from "react-native";
import React from "react";
import { Link, Redirect } from "expo-router";
import { useAuth } from "@/providers/AuthContextProvider";
import CustomButton from "@/components/CustomButton";
import { View } from "@/components/Themed";

const index = () => {
  const { loading, session, profile } = useAuth();

  if (loading) return <ActivityIndicator />;

  if (!session) return <Redirect href={"/sign-in"} />;

  if (profile?.group === "USER") return <Redirect href={"/(user-tabs)"} />;

  return !profile ? (
    <ActivityIndicator />
  ) : (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 10,
        alignItems: "center",
      }}
    >
      <Text>Welcome Admin</Text>
      <Link href={"/(admin-tabs)"} asChild>
        <CustomButton text="Continue" />
      </Link>
    </View>
  );
};

export default index;
