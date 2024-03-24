import { ActivityIndicator, View } from "react-native";
import React from "react";
import CustomButton from "../components/CustomButton";
import { Link, Redirect } from "expo-router";
import { useAuth } from "@/providers/AuthContextProvider";
import { supabase } from "@/lib/supabase";

const index = () => {
  const { loading, session, isAdmin, profile } = useAuth();

  if (loading) return <ActivityIndicator />;

  if (!session) return <Redirect href={"/sign-in"} />;

  if (profile?.group === "USER") return <Redirect href={"/(user-tabs)"} />;

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Link href={"/(user-tabs)"} asChild>
        <CustomButton text="User" />
      </Link>
      <Link href={"/(admin-tabs)"} asChild>
        <CustomButton text="Admin" />
      </Link>
      {/* <Link href={"/sign-in"} asChild>
        <CustomButton text="Sign in" />
      </Link> */}
      <CustomButton
        onPress={async () => {
          await supabase.auth.signOut();
        }}
        text="Sign out"
      />
    </View>
  );
};

export default index;
