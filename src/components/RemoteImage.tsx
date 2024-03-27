import { Image } from "react-native";
import React, { ComponentProps } from "react";
import { useProductImage } from "@/api/products";
import { useProfileImage } from "@/api/profiles";

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
  let data: any = null;
  let error: Error | null = null;

  switch (imageType) {
    case "product":
      const { data: productData, error: productError } = useProductImage(
        path ? path : fallback
      );
      data = productData;
      error = productError;
      break;

    case "profile":
      const { data: profileData, error: profileError } = useProfileImage(
        path ? path : fallback
      );
      data = profileData;
      error = profileError;

      break;

    default:
      break;
  }

  if (error || !data)
    return <Image source={{ uri: fallback }} {...imageProps} />;

  return <Image source={{ uri: data.signedUrl }} {...imageProps} />;
};

export default RemoteImage;
