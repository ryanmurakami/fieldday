import React from 'react'

import styles from './index.scss'

function Loader ({ progress }) {
  return (
    <div>
      <div className={styles.meter}>
        <span style={{ width: progress + "%" }}></span>
      </div>
    </div>
  )
}

export default Loader
