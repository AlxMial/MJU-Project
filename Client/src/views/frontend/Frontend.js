import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import AdminTopNavBar from "components/Navbars/AdminTopNavBar.js";
import home from './home/home.js';
import Curriculum from './curriculum/curriculum.js';
import subject from './subject/subject.js';

export default function frontend() {
    return (
        <>
            <AdminTopNavBar fixed />
            <BrowserRouter>
                <Switch>
                    <Route path="/home" exact component={home} />
                    <Route path="/curriculum" exact component={Curriculum} />
                    <Route path="/subject" exact component={subject} />
                    <Redirect from="*" to="/home" />
                </Switch>
            </BrowserRouter>
        </>
    )
}
