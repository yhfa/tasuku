import React from "react";
import { FormLabel, Input } from "@chakra-ui/react";

const ModalInput: React.FC<{
  label?: string;
  fieldName: string;
  registerOptions: object;
  width?: string;
  placeHolder: string;
  defaultValue?: string;
  registerFN: any;
}> = (props) => {
  const {
    label,
    fieldName,
    registerOptions,
    width,
    placeHolder,
    registerFN,
    defaultValue,
  } = props;
  return (
    <>
      {label && (
        <FormLabel fontWeight="bold" mb="2">
          {label}
        </FormLabel>
      )}
      <Input
        {...registerFN(fieldName, registerOptions)}
        placeholder={placeHolder}
        _placeholder={{
          color: "#131313",
          opacity: "50%",
          fontSize: "14px",
          fontWeight: "bold",
        }}
        defaultValue={defaultValue ? defaultValue : ""}
        size="sm"
        height="50px"
        bg="#EAEAEA"
        borderRadius="8px"
        mb="2"
        mt={!label && "2"}
        me="10px"
        width={width ? width : "100%"}
      />
    </>
  );
};
export default ModalInput;
