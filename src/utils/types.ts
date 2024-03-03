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
