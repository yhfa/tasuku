import { useState, createContext, useEffect } from "react";
import { ConstLocalStorage } from "src/constants/ConstLocalStorage";
import {
  getLocalStoredData,
  setLocalStoredData,
} from "src/_helpers/_localStorage";
import { MutationResult } from "src/models/NoAuthModules";
import { useMutation } from "react-query";
import { LogInAPI, RegisterAPI } from "src/api/auth/AuthAPI";

export const AuthenticationContext = createContext<{
  authenticated: boolean;

  isLoggedIn: boolean;

  logout: Function;
  login: MutationResult;
  registerMutate: MutationResult;
}>({
  authenticated: false,

  logout: () => { },

  isLoggedIn: false,
  login: new MutationResult(),

  registerMutate: new MutationResult(),
});

const AuthContextProvider = (props: any) => {
  const [authenticated, setAuthenticated] = useState<boolean>(
    getLocalStoredData(ConstLocalStorage.isAuth)
  );
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string>(
    getLocalStoredData(ConstLocalStorage.accessToken)
  );

  useEffect(() => {
    setLocalStoredData(ConstLocalStorage.isAuth, authenticated);
  }, [authenticated]);
  useEffect(() => {
    if (getLocalStoredData(ConstLocalStorage.accessToken)) {
      setAuthenticated(true);
    }
  }, [getLocalStoredData(ConstLocalStorage.accessToken)]);
  useEffect(() => {
    setLocalStoredData(ConstLocalStorage.accessToken, accessToken);
  }, [accessToken]);

  const login: MutationResult = useMutation(LogInAPI);
  const registerMutate: any = useMutation(RegisterAPI);

  const handleLogin = (mutation: MutationResult) => {
    setLocalStoredData(ConstLocalStorage.isAuth, true);
    setIsLoggedIn(true);
    setAuthenticated(true);

    setAccessToken(mutation?.data?.data?.token);

    setLocalStoredData(
      ConstLocalStorage.accessToken,
      mutation?.data?.data?.token
    );
    setLocalStoredData(ConstLocalStorage.user, mutation?.data?.data?.data);
  };

  useEffect(() => {
    if (
      login.status === "success" &&
      !getLocalStoredData(ConstLocalStorage.accessToken)
    ) {
      if (login?.data?.data["two_factor_authentication"]) {
        setAuthenticated(true);
      } else {
        handleLogin(login);
      }
    }
  }, [login.status === "success"]);

  useEffect(() => {
    if (
      registerMutate.status === "success" &&
      !getLocalStoredData(ConstLocalStorage.accessToken)
    ) {
      handleLogin(registerMutate);
    }
  }, [registerMutate.status === "success"]);

  const logout = () => {
    setAuthenticated(false);
    localStorage.clear();

    setIsLoggedIn(false);
  };
  return (
    <AuthenticationContext.Provider
      value={{
        logout,
        isLoggedIn,
        authenticated,
        login,
        registerMutate,
      }}
    >
      {props.children}
    </AuthenticationContext.Provider>
  );
};
export default AuthContextProvider;
