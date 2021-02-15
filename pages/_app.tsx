import React from "react";
import { AppProps } from "next/app";
import "../styles.css";
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { CookiesProvider } from "react-cookie";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: { main: "hsl(204, 100%, 50%)" },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CookiesProvider>
  );
}

export default MyApp;
