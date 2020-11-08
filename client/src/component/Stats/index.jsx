import React from 'react'

import Loader from '../Loader/index.jsx'

import styles from './index.scss'

function Stats ({ name, rating }) {
  return (
    <dl className={styles.dl}>
      <dt className={styles.dt}>{name}</dt>
      <dd className={styles.dd}><Loader progress={rating} isAlt={true}/></dd>
    </dl>
  )
}

export default Stats
