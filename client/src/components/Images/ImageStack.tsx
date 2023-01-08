import React from "react";
import { HStack, Circle, Flex } from "@chakra-ui/react";

import RoundedImage from "./RoundedImage";

const ImageStack: React.FC<{
  justifyContent?: string;
  marginRight?: string;
  imgList: string[];
  imageWidth: string;
  borderRadius: string;
  spacing: number;
  stackHeight: number;
  stackWidth: number;
}> = (props) => {
  const { imgList, imageWidth, stackHeight, stackWidth, justifyContent, marginRight } = props;

  return (
    <HStack
      justifyContent={justifyContent}
      marginRight={marginRight}
      position="relative"
      w={stackWidth}
      h={stackHeight}
    >
      <Flex
        position="absolute"
      >

        {imgList && imgList.map((img, imageIndex) => {
          if (imageIndex < 5) {
            return (
              <RoundedImage
                key={imageIndex}
                src={img}
                width={imageWidth}
                min-width="10"
                spacing={(props?.spacing)}
              />
            );
          } else if (imageIndex === 5) {
            return (
              <Circle
                key={imageIndex}
                pos="absolute"
                size={imageWidth}
                color="gray.400"
                bg="white"
                marginLeft={-10 * (props?.spacing)}
              >
                +{imgList.length - 5}
              </Circle>
            );
          }

          else return null;
        })}

      </Flex>
    </HStack>
  );
};

export default ImageStack;
