import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import AdminTopNavBar from "components/Navbars/AdminTopNavBar.js";
import home from 'views/frontend/home/home.js';
import Curriculum from 'views/frontend/curriculum/curriculum.js';
import subject from 'views/frontend/subject/subject.js';
import Account from 'views/frontend/account/account.js';


export default function Frontend() {
    const history = useHistory();
    const roleUser = localStorage.getItem("roleUser");
    if(roleUser === null)
    {
        history.push("/auth/login");
    }

    return (
        <>
              <main>
            <AdminTopNavBar fixed />
                <BrowserRouter>
                    <Switch>
                        <Route path="/home" exact component={home} />
                        <Route path="/home/curriculum" exact component={Curriculum} />
                        <Route path="/home/subject" exact component={subject} />
                        <Route path="/home/account" exact component={Account} />
                        <Redirect from="*/" to="/home" />
                    </Switch>
                </BrowserRouter>
                </main>
        </>
    )
}