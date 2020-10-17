import 'grd';
import './base.css';
import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import Header from './component/Header/index.jsx';
import HomeContainer from './containers/Home/index.jsx';
import EventContainer from './containers/Events/index.jsx';
import EventTemplateContainer from './containers/EventTemplate/index.jsx';
import CompetitorsContainer from './containers/Competitor/index.jsx';
import CompetitorsTemplateContainer from './containers/CompetitorTemplate/index.jsx';
import SettingsContainer from './containers/Settings/index.jsx';

function App() {
    let [fieldDay, setFieldDay] = useState({
        "current": {
            "id": "",
            "name": "",
            "progress": 0,
            "in_progress": false
        },
        "last": {
            "name": "",
            "image_url":""
        }
    })

    const updateFieldDay = function(event) {
        let newEvent = {...fieldDay};
        newEvent.current.id = event.id;
        newEvent.current.name = event.name;
        newEvent.current.progress = event.progress;
        newEvent.current.in_progress = true;

        setFieldDay(newEvent);
    }

    // Update in the background
    if (!fieldDay.current.in_progress) {
        setInterval(() => {
            let newEvent = {...fieldDay};
            newEvent.current.progress = fieldDay.current.progress + 10
            setFieldDay(newEvent)
        }, 10000);
    }

    return (
        <Router>
            <Header />
            <div className='container'>
                <Switch>
                    <Route exact path="/">
                        <HomeContainer
                            updateFieldDay={updateFieldDay}
                            event={fieldDay}/>
                    </Route>
                    <Route exact path="/events/:event_id">
                        <EventTemplateContainer />
                    </Route>
                    <Route exact path="/events/">
                        <EventContainer />
                    </Route>
                    <Route exact path="/competitors/:competitor_id">
                        <CompetitorsTemplateContainer />
                    </Route>
                    <Route exact path="/competitors/">
                        <CompetitorsContainer />
                    </Route>
                    <Route exact path="/settings">
                        <SettingsContainer />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;