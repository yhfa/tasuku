import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 0,
      retry: false,
    },
  },
});
// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    100: "#896BFF", //Primary
    200: "#FFCC33", //Bluwish
    700: "#523FCB", //Yellowish
    800: "white",
    900: "#C1C1C1", //dark-white
  },
};

const theme = extendTheme({ colors });
ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
