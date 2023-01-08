import { MutationStatus } from "react-query";

export interface ILogin {
  email: string;
  password: string;
}

export interface Iuser {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
}

export interface IRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  team: string;
}

export interface IResetPassword {
  token: string;
  email: string;
}

export class MutationResult {
  isLoading: boolean = true;
  reset: any;
  error: any = {};
  data: any = {};
  isError: boolean = true;
  mutate: Function = () => {};
  status: MutationStatus = "loading";
  failureCount: number = 0;
}
