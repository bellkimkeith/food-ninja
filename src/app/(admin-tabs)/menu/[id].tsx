import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useProduct } from "@/api/products";
import RemoteImage from "@/components/RemoteImage";

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const {
    data: currentProduct,
    error,
    isLoading,
  } = useProduct(parseInt(typeof id === "string" ? id : id[0]));
  const colorScheme = useColorScheme();

  if (isLoading) {
    return (
      <>
        <Stack.Screen options={{ title: "" }} />
        <ActivityIndicator />
      </>
    );
  }

  if (error || !currentProduct) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Stack.Screen options={{ title: "" }} />
        <Text>No product details</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: currentProduct?.name,
          headerRight: () => (
            <Link href={`/(admin-tabs)/menu/add?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={24}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <RemoteImage
        path={currentProduct.img}
        fallback="https://placehold.co/400x400.png"
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.priceText}>₱{currentProduct?.price.toFixed(2)}</Text>
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  priceText: {
    fontSize: 28,
    textAlign: "center",
    backgroundColor: "#eee",
    padding: 10,
    borderWidth: 1,
    borderColor: "#bbb",
  },
});
