import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);

export default function OrderTabsLayout() {
  return (
    <TopTabs>
      <TopTabs.Screen name="index" options={{ title: "ACTIVE" }} />
    </TopTabs>
  );
}
