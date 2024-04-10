import { Database } from "database.types";

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type InsertTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
export type UpdateTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];
export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];

export type Product = Tables<"products">;
export type InsertProduct = InsertTables<"products">;
export type UpdateProduct = UpdateTables<"products">;

export type Order = Tables<"orders">;
export type InsertOrder = InsertTables<"orders">;
export type UpdateOrder = UpdateTables<"orders">;

export type OrderItem = Tables<"order_items">;
export type InsertOrderItems = InsertTables<"order_items">;

export type Profile = Tables<"profiles">;
export type UpdateProfile = UpdateTables<"profiles">;

export type CartItem = {
  id: string;
  product: Product;
  product_id: number;
  quantity: number;
};

export type OrderStatus = "New" | "Cooking" | "Delivering" | "Delivered";

export const OrderStatusList: OrderStatus[] = [
  "New",
  "Cooking",
  "Delivering",
  "Delivered",
];
