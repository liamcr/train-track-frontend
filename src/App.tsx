import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <LogIn />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
