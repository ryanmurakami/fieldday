import React from 'react'

import styles from './index.scss'

function Loader ({ progress, isAlt }) {
  // simple hack for CSS
  if (progress <= 5) {
    progress = 7
  }
  return (
    <div>
      <div className={styles.meter}>
        <span className={isAlt ? styles.alt : ''} style={{ width: progress + '%' }} />
      </div>
    </div>
  )
}

export default Loader
