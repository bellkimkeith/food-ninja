export type Product = {
  name: string;
  img: string;
  id: number;
  price: number;
};

export type CartItem = {
  id: string;
  product: Product;
  product_id: number;
  quantity: number;
};

export type Order = {
  id: number;
  created_at: string;
  status: string;
  total: number;
  user_id: string;
  order_items: OrderItem[];
};

export type OrderItem = {
  id: number;
  order_id: Order["id"];
  quantity: number;
  product_id: Product["id"];
  product: Product;
};
