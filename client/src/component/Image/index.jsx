import React from 'react'
import { NavLink } from 'react-router-dom'

import styles from './index.scss'

function Image (props) {
  return (
    <div className={styles.wrapper}>
      <NavLink to={props.link}>
        <img src={props.image} />
      </NavLink>
      <NavLink to={props.secondaryLink || props.link}>
        <p className={styles.subtitle}>{props.subtitle}</p>
      </NavLink>
    </div>
  )
}

export default Image
