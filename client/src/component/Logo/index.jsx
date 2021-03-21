import React from 'react'

import logo from '../../static/logo.svg'

import styles from './index.scss'

function Logo (props) {
  return (
    <div className={styles.wrapper}>
      <img
        alt="Field Day Logo"
        className="svg-logo"
        src={logo}
        style={{ width: '18vw' }}
        />
    </div>
  )
}

export default Logo
