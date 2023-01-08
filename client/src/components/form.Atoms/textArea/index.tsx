import React from "react";
import { FormGroup, FormLabel as Label } from "react-bootstrap";
import { FormModules } from "src/models";
import { ErrorMessage } from "@hookform/error-message";
import { Textarea } from "@chakra-ui/react";
import "./style.css";
export const CustomTextarea: React.FC<FormModules.CustomInputProps> = ({
  fieldLabel,
  fieldName,
  errors,
  type,
  registerFN,
  registerOptions,
  placeHolder,
  defaultValue,
  textAreaRow,
  ...props
}) => {
  return (
    <FormGroup className="input__formG">
      <div
        className={
          type === "checkbox"
            ? "form-input-mt custom-control custom-checkbox"
            : "textArea-Container"
        }
        style={{ border: "none", position: "relative" }}
      >
        {type !== "checkbox" && <Label>{fieldLabel}</Label>}
        <Textarea
          {...registerFN(fieldName, registerOptions)}
          defaultValue={defaultValue && defaultValue}
          rows={textAreaRow}
          name={fieldName}
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

        {errors.fieldName && errors.fieldName.type === "required" && (
          <span role="alert">This is required</span>
        )}

        <ErrorMessage
          errors={errors}
          name={fieldName}
          render={({ message }) => (
            <span className="input-error">{message}</span>
          )}
        />
      </div>
    </FormGroup>
  );
};
