import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Image, HStack, useMediaQuery } from "@chakra-ui/react";
import bgImage from "src/assets/img/bg.png";
import { firstChartoUpper } from "src/_helpers/_utils";
const NoAuthLayout = (props: any) => {
  const { children, noScroll } = props;
  let location = useLocation();
  let title = firstChartoUpper(location.pathname.slice(1));
  const [isLargerThan450] = useMediaQuery("(min-width: 450px)");
  useEffect(() => {
    document.title = `${title ? title.split("/")[0] : "Log in"} | Tasuku`;
  }, [location.pathname, title]);
  return (
    <Box h={"100%"} overflow="hidden">
      <HStack
        overflow="hidden"
        minH={"100vh"}
        h={"100%"}
        bg={"white"}
        justifyContent="space-between"
      >
        {isLargerThan450 && (
          <Box>
            <Image
              maxW={"60vw"}
              maxH={"100vh"}
              w={"100%"}
              src={bgImage}
              alt="background image"
            />
          </Box>
        )}
        <Box
          bg={"brand.100"}
          overflowY={!noScroll || !isLargerThan450 ? "scroll" : "hidden"}
          maxH={"100vh"}
          minW={isLargerThan450 ? "583px" : "100vw"}
          maxW={"30vw"}
        >
          {children}
        </Box>
      </HStack>
    </Box>
  );
};

export default NoAuthLayout;
