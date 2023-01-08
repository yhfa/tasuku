import axios from "src/api/axois.client";
import { AuthModules } from "src/models";

export const LogInAPI = async (data: AuthModules.ILogin) => {
  return axios.post(`/user/signin`, data);
};

export const RegisterAPI = async (data: AuthModules.IRegister) => {
  return axios.post(`/user/signup`, data);
};
