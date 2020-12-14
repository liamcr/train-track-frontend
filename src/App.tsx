import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import { createMuiTheme, ThemeProvider, CssBaseline } from "@material-ui/core";
import NewWorkout from "./pages/NewWorkout";
import Profile from "./pages/Profile";
import Search from "./pages/Search";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: { main: "hsl(204, 100%, 50%)" },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
          <Route path="/new-workout">
            <NewWorkout />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
