import { FormModules } from "src/models";
import { Regex } from "src/constants/regex";


export const UserSettingsFormFields: FormModules.FormField[] = [
    {
        col: 6,
        fieldType: "input",
        fieldLabel: "First Name",
        fieldName: "firstName",
        type: "text",
        registerOptions: {
            required: "Required",
            pattern: {
                value: Regex.firstName,
                message: "Should be a valid name ",
            },
        },
    },
    {
        col: 6,
        fieldType: "input",
        fieldLabel: "Last Name",
        fieldName: "lastName",
        type: "text",
        registerOptions: {
            required: "Required",
            pattern: {
                value: Regex.lastName,
                message: "Should be a valid name ",
            },
        },
    },
    {
        col: 12,
        fieldType: "input",
        fieldLabel: "Email address",
        fieldName: "email",
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
        fieldLabel: "Current Password",
        fieldName: "password",
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
        fieldLabel: "New Password (optional field)",
        fieldName: "newPassword",
        type: "password",
        registerOptions: {
            pattern: {
                value: Regex.password,
                message:
                    "an uppercase, a lowercase letter, a symbol and a number",
            },
        },
    },
];
