import 'grd';
import './base.css';
import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Header from './component/Header/index.jsx';
import HomeContainer from './containers/Home/index.jsx';
import SampleLayout from './layout/SampleLayout.jsx';
import EventContainer from './containers/EventsContainer.jsx';
import CompetitorsContainer from './containers/CompetitorsContainer.jsx';
import SettingsContainer from './containers/SettingsContainer.jsx';

function App() {
    return (
        <Router>
            <Header />
            <div className='container'>
                <Switch>
                    <Route exact path="/">
                        <HomeContainer />
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