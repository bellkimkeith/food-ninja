import dayjs from "dayjs";
import { products } from "./products";

export const orders = [
  {
    id: 1,
    created_at: dayjs().subtract(3, "weeks").toISOString(),
    status: "Delivered",
    total: 399,
    user_id: "1",
    order_items: [
      {
        id: 1,
        order_id: 1,
        quantity: 2,
        product_id: products[3].id,
        product: products[3],
      },
      {
        id: 2,
        order_id: 1,
        quantity: 1,
        product_id: products[4].id,
        product: products[4],
      },
    ],
  },
  {
    id: 2,
    created_at: dayjs().subtract(2, "weeks").toISOString(),
    status: "Delivered",
    total: 99,
    user_id: "1",
    order_items: [
      {
        id: 1,
        order_id: 1,
        quantity: 1,
        product_id: products[4].id,
        product: products[4],
      },
    ],
  },
];
