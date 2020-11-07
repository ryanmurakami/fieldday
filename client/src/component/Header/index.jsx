import React from 'react'
import { Link } from 'react-router-dom'
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
          <Link to='/'>
            <Logo />
          </Link>
        </div>
        <div className='Cell -3of12'>
          <Link to='/events'>Events</Link>
        </div>
        <div className='Cell -3of12'>
          <Link to='/competitors'>Competitors</Link>
        </div>
        <div className={`Cell -3of12 ${styles.end}`}>
          <Link to='/settings'>
            <FontAwesomeIcon icon={faCog} />
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
