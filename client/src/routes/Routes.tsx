import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { nonauthRoutesMap, authRoutesMap } from "src/constants/ConstRoutes";
import { Login } from "src/pages/NoAuth";
import { Home } from "src/pages/Authed";
import { AuthenticationContext } from "src/services/AuthContext";
import ProjectContextProvider from "src/services/ProjectContext";
import UserContextProvider from "src/services/UserContext";

const Routes = () => {
  const { authenticated } = useContext(AuthenticationContext);
  useEffect(() => { }, [authenticated]);
  return (
    <BrowserRouter>
      {authenticated ? (
        <ProjectContextProvider>
          <UserContextProvider>
            <Switch>
              {authRoutesMap.map((e, i) => (
                <Route key={i} path={e.path} component={e.component} />
              ))}
              <Route component={Home} />
            </Switch>
          </UserContextProvider>
        </ProjectContextProvider>
      ) : (
        <Switch>
          <Route exact path={"/"} component={Login} />
          {nonauthRoutesMap.map((e, i) => (
            <Route key={i} path={e.path} component={e.component} />
          ))}
          <Route component={Login} />
        </Switch>
      )}
    </BrowserRouter>
  );
};

export default Routes;
