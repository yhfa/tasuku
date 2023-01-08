import React from "react";
import { Button } from "@chakra-ui/react";

import { ButtonTypeEnum } from "src/models/GlobalModules";

const ModalButton: React.FC<{
  width?: string;
  background: string;
  backgroundOnHover: string;
  disabled?: boolean;
  type?: ButtonTypeEnum;
  onClick?: () => void;
  isLoading?: boolean;
}> = (props) => {
  const {
    width,
    background,
    backgroundOnHover,
    disabled,
    type,
    onClick,
    children,
    isLoading,
  } = props;

  return (
    <Button
      width={width ? width : "100%"}
      text-align="center"
      bg={background}
      color="white"
      my="5"
      type={type}
      onClick={onClick}
      disabled={disabled}
      _hover={{ background: backgroundOnHover }}
      _active={{ background: backgroundOnHover }}
      borderRadius="20"
      isLoading={isLoading}
    >
      {children}
    </Button>
  );
};

ModalButton.defaultProps = { isLoading: false };

export default ModalButton;
