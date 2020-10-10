import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Sample2Layout from './Sample2Layout.jsx';
import SampleLayout from './SampleLayout.jsx';

function HomeLayout() {
    return (
        <Router>
            <div>
                <Link to="/">Home</Link>
                <Link to="/sample">Sample</Link>

                <Switch>
                    <Route exact path="/">
                        <Sample2Layout />
                    </Route>
                    <Route path="/sample">
                        <SampleLayout />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default HomeLayout;