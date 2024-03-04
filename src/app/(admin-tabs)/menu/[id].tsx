import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";
import React, { useState } from "react";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { products } from "@/assets/data/products";
import { useCart } from "@/providers/CartContextProvider";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const ProductDetails = () => {
  const [validUri, setValidUri] = useState(true);
  const { id } = useLocalSearchParams();
  const currentProduct = products.find((product) => product.id === +id);
  const colorScheme = useColorScheme();

  if (!currentProduct) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No product details</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: currentProduct.name,
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
      <Image
        onError={() => setValidUri(false)}
        source={{
          uri: validUri
            ? currentProduct.img
            : "https://placehold.co/400x400.png",
        }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.priceText}>₱{currentProduct.price.toFixed(2)}</Text>
    </View>
  );
};

export default ProductDetails;

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
