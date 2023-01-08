import { FieldErrors, RegisterOptions } from "react-hook-form";
import { QueryStatus } from "react-query";

export enum Mode {
  Add = "Add",
  Update = "Update",
  Save = "Save",
  Send = "Send",
}

export interface CustomSelectProps {
  selectOptions: any[];
  registerFN: any;
  registerOptions: RegisterOptions;
  errors: FieldErrors;
  fieldName: string;
  fieldLabel: string;
  placeholder?: string;
  onChange?: any;
  fieldType: "input" | "select" | "textarea" | "file";
}
export interface CustomInputProps {
  required?: boolean;
  placeHolder?: string;
  disabled?: boolean;
  registerFN: any;
  registerOptions: RegisterOptions;
  errors: FieldErrors;
  fieldName: string;
  fieldLabel: string;
  isReadOnly?: boolean;
  step?: string;
  onChange?: any;
  onInvalid?: any;
  getValues?: any;
  watch?: any;
  showPwEye?: boolean;
  textAreaRow?: string;
  defaultValue?: string;
  type?:
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week";
  fieldType: "input" | "select" | "file" | "textarea";
}

// For UI Usage, Will Cover All Form Fields Types
export interface FormField {
  error?: string;
  selectOptions?: any[];
  fieldName: string;
  fieldLabel: string;
  registerOptions: RegisterOptions;
  disabled?: any;
  defaultValue?: string;
  textAreaRow?: string;
  placeHolder?: string;
  type?:
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week";
  step?: string;
  fieldType: "input" | "select" | "file" | "textarea";
  [x: string]: any;
}
export interface CustomSubmitButtonProps {
  addStatus?: QueryStatus;
  updateStatus?: QueryStatus;
  errors: FieldErrors;
  mode?: Mode;
  disabledBtn?: boolean;
  style?: boolean;
  text?: string;
}

export interface FormErrorsProps {
  addStatus?: QueryStatus;
  updateStatus?: QueryStatus;
  errors: any;
}
