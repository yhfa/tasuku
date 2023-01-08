import React from "react";
import { FormGroup, FormLabel as Label } from "react-bootstrap";
import { FormModules } from "src/models";
import { ErrorMessage } from "@hookform/error-message";
import { Select } from "@chakra-ui/react";
import "src/components/Atoms/formAtoms/customInput/input.css";

export const CustomSelect: React.FC<FormModules.CustomSelectProps> = ({
  fieldLabel,
  fieldName,
  errors,
  registerFN,
  registerOptions,
  selectOptions,
  placeholder,
  ...props
}) => {
  return (
    <FormGroup className="input__formG">
      <div className="input-Container">
        <Label> {fieldLabel} </Label>
        <Select
          {...registerFN(fieldName, registerOptions)}
          className={`form-control ${
            errors[fieldName] ? "form-control-error" : ""
          }`}
          name={fieldName}
          id={`${fieldName}-id`}
        >
          <option disabled value="">
            {placeholder}
          </option>
          {selectOptions}
        </Select>
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
