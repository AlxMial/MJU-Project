import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// compone
import Navbar from "components/Navbars/AuthNavbar.js";
// views
import Login from "views/auth/Login.js";
import Register from "views/auth/Register.js";
import ForgotPassword from "views/auth/ForgotPassword";
import ResetPassword from "views/auth/ResetPassword";
import ForgotReturn from "views/auth/ForgotReturn";


export default function Auth() {
  return (
    <>
      <Navbar transparent />
      <main>
        <section className="relative w-full h-full py-16 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-green-mju bg-no-repeat bg-full" 
          ></div>
          <Switch>
            <Route path="/auth/login" exact component={Login} />
            <Route path="/auth/register" exact component={Register} />
            <Route path="/auth/forgotpassword" exact component={ForgotPassword} />
            <Route path="/auth/resetpassword/:id" exact component={ResetPassword} />
            <Route path="/auth/forgotreturn" exact component={ForgotReturn} />
            <Redirect from="/" to="/auth/login" />
          </Switch>
        </section>
      </main>
    </>
  );
}
