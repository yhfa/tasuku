import React, { useState } from "react";
import { FormGroup, FormLabel as Label } from "react-bootstrap";
import { FormModules } from "src/models";
import { ErrorMessage } from "@hookform/error-message";
import { Button, Input, Box } from "@chakra-ui/react";
import "./UserSettingsInput.css";
const CustomInput: React.FC<FormModules.CustomInputProps> = ({
  fieldLabel,
  fieldName,
  errors,
  required,
  type,
  registerFN,
  registerOptions,
  getValues,
  step,
  onInvalid,
  disabled,
  isReadOnly,
  showPwEye,
  defaultValue,
  onChange,
  watch,
  placeHolder,
  ...props
}) => {
  const [localType, setLocalType] = useState<any>(type || "");

  return (
    <FormGroup className="User__input__formG">
      <div
        className={
          type === "checkbox"
            ? "form-input-mt custom-control custom-checkbox"
            : "User-input-Container"
        }
        style={{ border: "none", position: "relative" }}
      >
        {type !== "checkbox" && <Label className="User-label">{fieldLabel}</Label>}

        <Input
          {...registerFN(fieldName, registerOptions)}
          type={showPwEye === true ? localType : type || "text"}
          step={step}
          id={`${fieldName}-id`}
          className={
            type === "checkbox"
              ? "custom-control-input"
              : `form-control ${errors[fieldName] ? "form-control-error" : ""}`
          }
          placeholder={placeHolder}
        />
        {type === "checkbox" && (
          <React.Fragment>
            <label className="custom-control-label" htmlFor={`${fieldName}-id`}>
              &nbsp;
            </label>
            <strong>{fieldLabel}</strong>
          </React.Fragment>
        )}
        {showPwEye && localType === "password" ? (
          <Button
            position={"absolute"}
            right={"0"}
            top={"35%"}
            zIndex={"1"}
            color={"gray"}
            _hover={{ background: "transparent", color: "brand.100" }}
            width={"fit-content"}
            _focus={{ outline: "none" }}
            _active={{ outline: "none" }}
            bg={"transparent"}
            border={"none"}
            outline={"none"}
            onClick={() => setLocalType("text")}
          >
            Show
          </Button>
        ) : (
          showPwEye && (
            <Button
              position={"absolute"}
              zIndex={"1"}
              right={"0"}
              top={"35%"}
              color={"gray"}
              _hover={{ background: "transparent", color: "brand.100" }}
              width={"fit-content"}
              _focus={{ outline: "none" }}
              _active={{ outline: "none" }}
              bg={"transparent"}
              border={"none"}
              outline={"none"}
              onClick={() => setLocalType("password")}
            >
              Hide
            </Button>
          )
        )}
        <Box position="absolute" bottom="-5">
          <ErrorMessage
            errors={errors}
            name={fieldName}
            render={({ message }) => (
              <span className="User-input-error ">{message}</span>
            )}
          />

        </Box>
      </div>
    </FormGroup>
  );
};
export default CustomInput;
