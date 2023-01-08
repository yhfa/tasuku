import React from "react";

import { Select } from "@chakra-ui/react";

const ModalMenu: React.FC<{
  fieldName: string;
  width?: string;
  defaultValue?: string;
  registerFN: any;
}> = (props) => {
  const { fieldName, registerFN, children, width, defaultValue } = props;
  return (
    <Select
      defaultValue={defaultValue}
      {...registerFN(fieldName)}
      width={width ? width : "100%"}
      height="50px"
      color="white"
      bg="#707070"
      border="3px solid #EAEAEA"
      _hover={{ bg: "gray" }}
      _expanded={{ bg: "#707070" }}
    >
      {children}
    </Select>
  );
};

export default ModalMenu;
