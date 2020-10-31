import 'grd'
import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Header from './component/Header/index.jsx'
import HomeContainer from './containers/Home/index.jsx'
import EventContainer from './containers/Events/index.jsx'
import EventTemplateContainer from './containers/EventTemplate/index.jsx'
import CompetitorsContainer from './containers/Competitor/index.jsx'
import CompetitorsTemplateContainer from './containers/CompetitorTemplate/index.jsx'
import SettingsContainer from './containers/Settings/index.jsx'

import './base.css'

function App () {
  const [fieldDay] = useState({
    isRunning: false,
    current: {
      id: '',
      name: '',
      progress: 0
    },
    last: {
      name: '',
      imageUrl: ''
    }
  })

  return (
    <Router>
      <Header />
      <div className='container'>
        <Switch>
          <Route exact path='/'>
            <HomeContainer
              event={fieldDay}
            />
          </Route>
          <Route exact path='/events/:event_id'>
            <EventTemplateContainer />
          </Route>
          <Route exact path='/events/'>
            <EventContainer />
          </Route>
          <Route exact path='/competitors/:competitor_id'>
            <CompetitorsTemplateContainer />
          </Route>
          <Route exact path='/competitors/'>
            <CompetitorsContainer />
          </Route>
          <Route exact path='/settings'>
            <SettingsContainer />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
