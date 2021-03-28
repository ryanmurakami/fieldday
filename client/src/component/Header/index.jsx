import React, { useContext, useEffect } from 'react'
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

  useEffect(async () => {
    let mounted = true

    const res = await getAPI('isAuthenticated')
    if (mounted) user.setLoggedIn(
      res.isAuthenticated
    )

    return () => mounted = false
  }, [])

  return (
    <header className={styles.header}>
      <div className={`container Grid -middle ${styles.container}`}>
        <div className={styles.logo}>
          <NavLink to='/'>
            <Logo />
          </NavLink>
        </div>
        <div className={styles.cell}>
          <div className={styles.icon} />
          <NavLink
            activeClassName={styles.selected}
            to='/events'
          >
            Events
          </NavLink>
        </div>
        <div className={styles.cell}>
          <NavLink
            activeClassName={styles.selected}
            to='/competitors'
          >
            Competitors
          </NavLink>
        </div>
        <div className={styles.end}>
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
