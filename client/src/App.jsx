import 'grd';
import _ from 'lodash';
import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

import checkAPIRoute from './helper.js';

import Header from './component/Header/index.jsx';
import HomeContainer from './containers/Home/index.jsx';
import EventContainer from './containers/Events/index.jsx';
import EventTemplateContainer from './containers/EventTemplate/index.jsx';
import CompetitorsContainer from './containers/Competitor/index.jsx';
import CompetitorsTemplateContainer from './containers/CompetitorTemplate/index.jsx';
import SettingsContainer from './containers/Settings/index.jsx';

import './base.css';

function App() {
    const [fieldDay, setFieldDay] = useState({
        "current": {
            "id": "",
            "name": "",
            "progress": 0,
            "inProgress": false
        },
        "last": {
            "name": "",
            "imageUrl":""
        }
    })

    // Update in the background
    if (_.get(fieldDay, 'current.id') && !_.get(fieldDay, 'current.inProgress')) {
        const interval = setInterval(() => {
            const newEvent = {...fieldDay};
            newEvent.current.progress = fieldDay.current.progress + 10;
            newEvent.current.inProgress = true;
            
            if (newEvent.current.progress > 100) {
                clearInterval(interval);
                checkAPIRoute(`commands/update?eventId=${fieldDay.current.id}`, (res) => {
                    newEvent.current.id = "";
                    newEvent.current.name = "";
                    newEvent.current.progress = 0;
                    newEvent.current.inProgress = false;

                    newEvent.last.name = res.body.event_name;
                    newEvent.last.imageUrl = res.body.competitor_image;

                    setFieldDay(newEvent)
                });
            } else {
                setFieldDay(newEvent)
            }
        }, 5000);
    }

    return (
        <Router>
            <Header />
            <div className='container'>
                <Switch>
                    <Route exact path="/">
                        <HomeContainer
                            setFieldDay={setFieldDay}
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