import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthContextProvider";
import { UpdateProfile } from "@/utils/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useProfile = (id: number) => {
  return useQuery({
    queryKey: ["profile", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const id = session?.user.id;
  return useMutation({
    mutationFn: async (data: UpdateProfile) => {
      if (!id) return null;
      const { data: updatedProfile, error } = await supabase
        .from("profiles")
        .update(data)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return updatedProfile;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["profiles"] });
      await queryClient.invalidateQueries({ queryKey: ["profiles", id] });
    },
  });
};

export const useProfileImage = (path: string) => {
  return useQuery({
    queryKey: ["profiles", path],
    queryFn: async () => {
      const { data, error } = await supabase.storage
        .from("avatars")
        .createSignedUrl(path, 3600);
      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
};
