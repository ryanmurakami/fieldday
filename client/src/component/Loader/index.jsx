import React from 'react'

import styles from './index.scss'

function Loader ({ progress, isAlt }) {
  // simple hack for CSS
  if (progress <= 5) {
    progress = 7
  }

  // {isAlt ? styles.alt : `${styles['progress-bar-animated']} ${styles['progress-bar-striped']}`}
  return (
    <div>
      <div className={styles.meter}>
        <div 
          className={isAlt ? styles.alt : `${styles['progress-bar-animated']} ${styles['progress-bar-striped']}`} 
          style={{ width: progress + '%' }} />
      </div>
    </div>
  )
}

export default Loader
