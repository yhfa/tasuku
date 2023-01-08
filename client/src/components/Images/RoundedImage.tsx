import React from "react";
import { Image } from "@chakra-ui/react";

const RoundedImage: React.FC<{
  src: string;
  width: string;
  spacing: number;
}> = (props) => {
  const { src, width, spacing } = props;
  return (
    <Image
      src={src}
      alt={src}
      minW={10}
      w={width}
      borderRadius="100"
      border="1px"
      borderWidth="4px"
      borderColor="white"
      marginLeft={`${spacing}px`}
    />
  );
};

export default RoundedImage;
