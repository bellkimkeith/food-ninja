import { Pressable, StyleSheet, Text } from "react-native";
import { Product } from "@/utils/types";
import { Link } from "expo-router";
import { useSegments } from "expo-router";
import RemoteImage from "./RemoteImage";

type ProductListItemProps = {
  product: Product;
};

const ProductListItem = ({ product }: ProductListItemProps) => {
  const segments = useSegments<
    ["(admin-tabs)", "menu", "[id]"] | ["(user-tabs)", "menu", "[id]"]
  >();

  return (
    <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <RemoteImage
          path={product.img}
          fallback="https://placehold.co/400x400.png"
          style={styles.image}
          resizeMode="contain"
        />
        <Text>{product.name}</Text>
      </Pressable>
    </Link>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    maxWidth: "48%",
    borderRadius: 12,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 12,
    marginBottom: 10,
  },
});
