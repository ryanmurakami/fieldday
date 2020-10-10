import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import SampleLayout from './layout/SampleLayout.jsx';
import EventContainer from './containers/EventsContainer.jsx';
import CompetitorsContainer from './containers/CompetitorsContainer.jsx';
import SettingsContainer from './containers/SettingsContainer.jsx';

function App() {
    return (
        <Router>
            <div>
                <Link to="/">Home</Link>
                <br />
                <Link to="/events">Events</Link>
                <br />
                <Link to="/competitors">Competitors</Link>
                <br />
                <Link to="/settings">Settings</Link>

                <Switch>
                    <Route exact path="/">
                        <SampleLayout />
                    </Route>
                    <Route path="/events/:events_id?">
                        <EventContainer />
                    </Route>
                    <Route path="/competitors/:competitor_id?">
                        <CompetitorsContainer />
                    </Route>
                    <Route path="/settings">
                        <SettingsContainer />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;