import React from "react";
import { Alert } from "react-bootstrap";
import { FormModules } from "src/models";

export const FormErrors: React.FC<FormModules.FormErrorsProps> = ({
  addStatus,
  updateStatus,
  errors,
}) => {
  React.useEffect(() => {}, [errors]);
  return (
    <>
      {addStatus === "error" &&
        errors &&
        [...new Set(errors)].flat().map((message: any, i: number) => (
          <Alert
            key={i}
            style={{ color: "#FFCC33", background: "transparent" }}
          >
            {message}
          </Alert>
        ))}

      {updateStatus === "error" &&
        errors &&
        [...new Set(errors)].flat().map((message: any, i: number) => (
          <Alert
            key={i}
            style={{ color: "#FFCC33", background: "transparent" }}
          >
            {message}
          </Alert>
        ))}
    </>
  );
};
