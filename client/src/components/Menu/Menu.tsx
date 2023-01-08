import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  IconButton,
  Menu as ChakraMenu,
  MenuButton,
  MenuList,
} from "@chakra-ui/react";

const Menu: React.FC<{
  btnColor: string;
  opacityOnHover: number;
  rotate?: boolean;
}> = (props) => {
  const { btnColor, opacityOnHover, children, rotate } = props;
  return (
    <ChakraMenu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<BsThreeDotsVertical />}
        size="md"
        style={{ transform: rotate ? "rotate(90deg)" : "rotate(0deg)" }}
        bg="transparent"
        color={btnColor}
        _hover={{ bg: "transparent", opacity: opacityOnHover }}
        _focus={{ bg: "transparent" }}
        _active={{ bg: "transparent" }}
      />
      <MenuList>{children}</MenuList>
    </ChakraMenu>
  );
};

export default Menu;
