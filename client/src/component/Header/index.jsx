import React from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import 'grd'

import Logo from '../Logo/index.jsx'

import styles from './index.scss'

function Header (props) {
  return (
    <header className={styles.header}>
      <div className='container Grid -middle'>
        <div className='Cell -3of12'>
          <NavLink to='/'>
            <Logo />
          </NavLink>
        </div>
        <div className='Cell -3of12'>
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
          <NavLink
            activeClassName={styles.selected}
            to='/settings'
          >
            <FontAwesomeIcon icon={faCog} />
          </NavLink>
        </div>
      </div>
    </header>
  )
}

export default Header
