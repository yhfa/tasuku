import axios from "axios";
import { ConstLocalStorage } from "src/constants/ConstLocalStorage";
import { genericErrorHandler } from "src/_helpers/_genericErrorHandler";
import { getLocalStoredData } from "src/_helpers/_localStorage";

axios.defaults.baseURL = process.env.REACT_APP_API_BASE;

axios.interceptors.request.use((request: any) => {
  if (request.headers["Content-Type"] !== "application/x-www-form-urlencoded") {
    request.headers["Content-Type"] = "application/json";
  }

  const accessToken = getLocalStoredData(ConstLocalStorage.accessToken);

  if (accessToken) {
    request.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return request;
});

// Add a response interceptor
axios.interceptors.response.use(
  (response) => response,
  function (error) {
    error.handleGlobally = genericErrorHandler(error);

    return Promise.reject(error);
  }
);

export default axios;
