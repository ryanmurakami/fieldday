import React from 'react'
import { Link } from 'react-router-dom'
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
          <Link to='/settings'>Settings</Link>
        </div>
      </div>
    </header>
  )
}

export default Header
