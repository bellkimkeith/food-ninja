import { Image } from "react-native";
import React, { ComponentProps, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type RemoteImageProps = {
  path?: string | null;
  fallback: string;
  imageType: string;
} & Omit<ComponentProps<typeof Image>, "source">;

const RemoteImage = ({
  path,
  fallback,
  imageType,
  ...imageProps
}: RemoteImageProps) => {
  const [image, setImage] = useState("");
  const [data, setData] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    if (!path) return;
    (async () => {
      setImage("");
      if (imageType === "product") {
        await supabase.storage
          .from("product-images")
          .createSignedUrl(path, 3600)
          .then((result) => {
            setData(result.data?.signedUrl);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        await supabase.storage
          .from("avatars")
          .createSignedUrl(path, 3600)
          .then((result) => {
            setData(result.data?.signedUrl);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (error) {
        throw new Error(error);
      }
      if (data) {
        setImage(data);
      }
    })();
  }, [path, data]);

  return <Image source={{ uri: image || fallback }} {...imageProps} />;
};

export default RemoteImage;
