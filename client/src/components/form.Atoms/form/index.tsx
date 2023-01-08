import React from "react";
import "./form.css";
const CustomForm = (props: any) => {
  const { children, onSubmit } = props;
  return (
    <form noValidate onSubmit={onSubmit} className={"form__content"}>
      {children}
    </form>
  );
};

export default CustomForm;
