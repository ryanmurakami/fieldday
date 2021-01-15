import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import 'grd'
import { getAPI } from '../../helper.js'
import UserContext from './../../context/userContext.js'

import Logo from '../Logo/index.jsx'

import styles from './index.scss'

function Header () {
  const user = useContext(UserContext)

  getAPI('isAuthenticated', (res) => {
    user.setLoggedIn(
      res.isAuthenticated
    )
  })

  return (
    <header className={styles.header}>
      <div className='container Grid -middle'>
        <div className='Cell -3of12'>
          <NavLink to='/'>
            <Logo />
          </NavLink>
        </div>
        <div className='Cell -3of12'>
          <div className={styles.icon} />
          <NavLink
            activeClassName={styles.selected}
            to='/events'
          >
            Events
          </NavLink>
        </div>
        <div className='Cell -3of12'>
          <NavLink
            activeClassName={styles.selected}
            to='/competitors'
          >
            Competitors
          </NavLink>
        </div>
        <div className={`Cell -3of12 ${styles.end}`}>
          {user.loggedIn ?
            <NavLink
              activeClassName={styles.selected}
              to='/settings'
            >
              <FontAwesomeIcon icon={faCog} />
            </NavLink>
            :
            <NavLink
              activeClassName={styles.selected}
              to='/login'
            >
              Login
            </NavLink>
          }
        </div>
      </div>
    </header>
  )
}

export default Header
