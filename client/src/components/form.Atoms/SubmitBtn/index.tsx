import React from "react";
import { FormModules } from "src/models";
import "./submitBtn.css";
export const SubmitButton: React.FC<FormModules.CustomSubmitButtonProps> = ({
  addStatus,
  updateStatus,
  errors,
  mode,
  disabledBtn,
  style,
  text,
}) => {
  return (
    <div className="d-flex mt-2 col-md-12 submit__btn justify-content-center" >
      <button

        type="submit"
        disabled={
          addStatus !== "loading" &&
            updateStatus !== "loading" &&
            Object.keys(errors).length === 0 &&
            errors.constructor === Object &&
            !disabledBtn
            ? false
            : true
        }
      >
        {(mode && addStatus === "loading") || updateStatus === "loading"
          ? `${mode}ing...`
          : mode}
        {!mode && text}
      </button>
    </div>
  );
};
