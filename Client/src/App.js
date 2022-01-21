import React,{useState,useEffect} from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ToastProvider } from 'react-toast-notifications';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
import axios from "axios";
// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";
import Frontend from "layouts/Frontend.js"
import { AuthContext } from "./services/AuthContext";
// views without layouts

function App() {
    const [authState, setAuthState] = useState({
      email: "",
      id: 0,
      status: false,
      role:"",
    });

    useEffect(() => {
          axios
            .get("http://localhost:3001/users/auth", {
              headers: {
                accessToken: localStorage.getItem("accessToken"),
              },
            })
            .then((response) => {
              if (response.data.error) {
                setAuthState({ ...authState, status: false });
              } else {
                setAuthState({
                  email: response.data.email,
                  id: response.data.id,
                  status: true,
                  role:response.data.role,
                });
              }
            });
      
    }, []);

    return (
      <div className="App">
        <AuthContext.Provider value={{ authState, setAuthState }}>
            <BrowserRouter>
                <ToastProvider>
                <Switch>
                    {/* add routes with layouts */}
                    <Route path="/admin" component={Admin} />
                    <Route path="/auth" component={Auth} />
                    <Route path="/home" component={Frontend} />
                    {/* add routes without layouts */}
                    {/* <Route path="/landing" exact component={Landing} />
                    <Route path="/profile" exact component={Profile} /> */}
                    <Route path="/" exact component={Auth} />
                    {/* add redirect for first page */}
                    <Redirect from="*" to="/auth/login" />
                </Switch>
                </ToastProvider>
            </BrowserRouter>
        </AuthContext.Provider>
      </div>
    )
}

export default App;