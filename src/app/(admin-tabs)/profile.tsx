import { View, Button } from "react-native";
import React from "react";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";

const ProfileScreen = () => {
  return (
    <View>
      <Button
        onPress={async () => {
          await supabase.auth.signOut();
          router.replace("/");
        }}
        title="Sign out"
      />
    </View>
  );
};

export default ProfileScreen;
