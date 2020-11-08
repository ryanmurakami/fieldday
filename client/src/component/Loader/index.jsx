import React from 'react'

import styles from './index.scss'

function Loader ({ progress, isAlt }) {
  return (
    <div>
      <div className={styles.meter}>
        <span className={isAlt ? styles.alt : ''} style={{ width: progress + "%" }}></span>
      </div>
    </div>
  )
}

export default Loader
