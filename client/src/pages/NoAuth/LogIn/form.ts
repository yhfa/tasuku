import { FormModules } from "src/models";
import { Regex } from "src/constants/regex";
export const LogInFormDefault = {
  email: "",
  password: "",
};

export const LogInFormFields: FormModules.FormField[] = [
  {
    col: 12,
    fieldType: "input",
    fieldLabel: "Email address*",
    fieldName: "email",
    placeHolder: "Enter your email address",
    type: "email",
    registerOptions: {
      required: "Email is required, Shouldn't be empty",
    },
  },
  {
    col: 12,
    fieldType: "input",
    fieldLabel: "Password*",
    fieldName: "password",
    placeHolder: "Your strong password",
    type: "password",
    registerOptions: {
      required: "Password is required, Shouldn't be empty",
    },
  },
];
