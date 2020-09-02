import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: { main: "hsl(204, 100%, 50%)" },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <LogIn />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
