import { CartItem, Product } from "@/utils/types";
import { PropsWithChildren, createContext, useContext, useState } from "react";

type CartType = {
  cartItems: CartItem[];
  addCartItem: (product: Product, quantity: CartItem["quantity"]) => void;
  updateQuantity: () => void;
};

const CartContext = createContext<CartType>({
  cartItems: [],
  addCartItem: () => {},
  updateQuantity: () => {},
});

const CartContextProvider = ({ children }: PropsWithChildren) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addCartItem = (product: Product, quantity: CartItem["quantity"]) => {
    const newCartItem: CartItem = {
      id: new Date().toISOString(),
      product,
      product_id: product.id,
      quantity,
    };

    setCartItems([newCartItem, ...cartItems]);
  };

  const updateQuantity = () => {};

  return (
    <CartContext.Provider value={{ cartItems, addCartItem, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;

export const useCart = () => useContext(CartContext);
