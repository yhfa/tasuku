import { FormModules } from "src/models";
import { Regex } from "src/constants/regex";
export const RegisterFormDefault = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  team: "",
};

export const RegisterFormFields: FormModules.FormField[] = [
  {
    col: 12,
    fieldType: "input",
    fieldLabel: "First Name*",
    fieldName: "firstName",
    placeHolder: "Enter your first name",
    type: "text",
    registerOptions: {
      required: "First name is required, Shouldn't be empty",
      pattern: {
        value: Regex.firstName,
        message: "Should be a valid name ",
      },
    },
  },
  {
    col: 12,
    fieldType: "input",
    fieldLabel: "Last Name*",
    fieldName: "lastName",
    placeHolder: "Enter your last name",
    type: "text",
    registerOptions: {
      required: "Last name is required, Shouldn't be empty",
      pattern: {
        value: Regex.lastName,
        message: "Should be a valid name ",
      },
    },
  },
  {
    col: 12,
    fieldType: "input",
    fieldLabel: "Email address*",
    fieldName: "email",
    placeHolder: "Enter your email address",
    type: "email",
    registerOptions: {
      required: "Email is required, Shouldn't be empty",
      pattern: {
        value: Regex.email,
        message: "Should be valid email ",
      },
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
      pattern: {
        value: Regex.password,
        message:
          "an uppercase, a lowercase letter, a symbol and a number",
      },
    },
  },
  {
    col: 12,
    fieldType: "input",
    fieldLabel: "Confirm Password*",
    fieldName: "confirmPassword",
    placeHolder: "Confirm Your password",
    type: "password",
    registerOptions: {
      required: "Confirm password is required, Shouldn't be empty",
      validate: (value: string) => {
        let e: any = document.getElementById(
          `${RegisterFormFields[3].fieldName}-id`
        );
        if (value === e.value) {
          return true;
        } else {
          return "Must match password";
        }
      },
    },
  },
];
