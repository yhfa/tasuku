import React from "react";
import { Text } from "@chakra-ui/react";

const ModalErrorMessage: React.FC<{ isVaild: boolean }> = (props) => {
  const { isVaild, children } = props;
  return (
    <>
      {isVaild ? (
        <Text color="red" fontWeight="600" fontSize="sm">
          {children}
        </Text>
      ) : (
        <></>
      )}
    </>
  );
};

export default ModalErrorMessage;
