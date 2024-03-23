import { Image } from "react-native";
import React, { ComponentProps } from "react";
import { useProductImage } from "@/api/products";

type RemoteImageProps = {
  path?: string | null;
  fallback: string;
} & Omit<ComponentProps<typeof Image>, "source">;

const RemoteImage = ({ path, fallback, ...imageProps }: RemoteImageProps) => {
  const { data, error } = useProductImage(path ? path : fallback);

  if (error || !data)
    return <Image source={{ uri: fallback }} {...imageProps} />;

  return <Image source={{ uri: data.signedUrl }} {...imageProps} />;
};

export default RemoteImage;
