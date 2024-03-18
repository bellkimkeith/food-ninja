import { CartItem, Product } from "@/utils/types";
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { randomUUID } from "expo-crypto";
import { Tables } from "database.types";

type CartType = {
  cartItems: CartItem[];
  addCartItem: (product: Product, quantity: CartItem["quantity"]) => void;
  updateQuantity: (itemId: string, amount: number) => void;
  totalAmount: number;
};

const CartContext = createContext<CartType>({
  cartItems: [],
  addCartItem: () => {},
  updateQuantity: () => {},
  totalAmount: 0,
});

const CartContextProvider = ({ children }: PropsWithChildren) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addCartItem = (product: Product, quantity: CartItem["quantity"]) => {
    const cartItemExists = cartItems.find((item) => item.product === product);

    if (cartItemExists) {
      updateQuantity(product.id.toString(), quantity);
      return;
    }

    const newCartItem: CartItem = {
      id: randomUUID(),
      product,
      product_id: product.id,
      quantity,
    };

    setCartItems([newCartItem, ...cartItems]);
  };

  const updateQuantity = (itemId: string, amount: number) => {
    const updatedCartItems = cartItems
      .map((item) =>
        item.product.id.toString() !== itemId
          ? item
          : { ...item, quantity: item.quantity + amount }
      )
      .filter((item) => item.quantity > 0);

    console.log(cartItems);

    console.log(updatedCartItems);

    setCartItems(updatedCartItems);
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => (sum += item.product.price * item.quantity),
    0
  );

  return (
    <CartContext.Provider
      value={{ cartItems, addCartItem, updateQuantity, totalAmount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;

export const useCart = () => useContext(CartContext);
