import { Database } from "database.types";

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];

// export type Product = {
//   name: string;
//   img: string;
//   id: number;
//   price: number;
// };

export type Product = Tables<"products">;
export type Order = Tables<"orders">;
export type Profile = Tables<"profiles">;

export type CartItem = {
  id: string;
  product: Product;
  product_id: number;
  quantity: number;
};

// export type Order = {
//   id: number;
//   created_at: string;
//   status: string;
//   total: number;
//   user_id: string;
//   order_items: OrderItem[];
// };

export type OrderItem = {
  id: number;
  order_id: Order["id"];
  quantity: number;
  product_id: Product["id"];
  product: Product;
};

export type OrderStatus = "New" | "Cooking" | "Delivering" | "Delivered";

export const OrderStatusList: OrderStatus[] = [
  "New",
  "Cooking",
  "Delivering",
  "Delivered",
];
