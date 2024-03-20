import { supabase } from "@/lib/supabase";
import { InsertOrderItems } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useInsertOrderItems = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertOrderItems[]) => {
      const { data: newOrderItems, error } = await supabase
        .from("order_items")
        .insert(data)
        .select();

      if (error) {
        throw new Error(error.message);
      }
      return newOrderItems;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["orders_items"],
      });
    },
  });
};
