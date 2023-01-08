import React from "react";

import { ToastContainer, Flip } from "react-toastify";
import AuthContextProvider from "./services/AuthContext";
import Routes from "./routes/Routes";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthContextProvider>
      <div className="App">
        <Routes />
        <ToastContainer
          autoClose={2000}
          transition={Flip}
          limit={1}
          theme={"colored"}
          position={"bottom-right"}
        />
      </div>
    </AuthContextProvider>
  );
}

export default App;
