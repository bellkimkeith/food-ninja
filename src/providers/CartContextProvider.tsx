import { CartItem, Order, Product } from "@/utils/types";
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { randomUUID } from "expo-crypto";
import { useInsertOrder } from "@/api/orders";
import { useAuth } from "./AuthContextProvider";
import { useRouter } from "expo-router";
import { useInsertOrderItems } from "@/api/order-items";

type CartType = {
  cartItems: CartItem[];
  addCartItem: (product: Product, quantity: CartItem["quantity"]) => void;
  updateQuantity: (itemId: string, amount: number) => void;
  totalAmount: number;
  checkout: () => void;
};

const CartContext = createContext<CartType>({
  cartItems: [],
  addCartItem: () => {},
  updateQuantity: () => {},
  totalAmount: 0,
  checkout: () => {},
});

const CartContextProvider = ({ children }: PropsWithChildren) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { mutate: insertOrder } = useInsertOrder();
  const { mutate: insertOrderItem } = useInsertOrderItems();
  const { session } = useAuth();
  const id = session?.user.id ? session?.user.id : "";
  const router = useRouter();

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

  const resetCart = () => {
    setCartItems([]);
  };

  const checkout = () => {
    insertOrder(
      { total: totalAmount, user_id: id },
      {
        onSuccess: (data) => {
          if (!data) return [];
          insertOrderItems(data);
        },
      }
    );
  };

  const insertOrderItems = (order: Order) => {
    const orderItems = cartItems.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
    }));

    insertOrderItem(orderItems, {
      onSuccess: () => {
        resetCart();
        router.navigate(`/(user-tabs)/orders/${order.id}`);
      },
    });
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addCartItem, updateQuantity, totalAmount, checkout }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;

export const useCart = () => useContext(CartContext);
