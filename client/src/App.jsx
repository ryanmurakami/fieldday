import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Sample2Layout from './layout/Sample2Layout.jsx';
import SampleLayout from './layout/SampleLayout.jsx';

function App() {
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

export default App;