import React from 'react'

import styles from './index.scss'

function Loader ({ progress, isAlt }) {
  // simple hack for CSS
  if (progress <= 5) {
    progress = 7
  }

  // {isAlt ? styles.alt : ''}
  return (
    <div>
      <div className={styles.meter}>
        <div className={isAlt ? styles.alt : ''} style={{ width: progress + '%' }}>
          <div className={`${styles['progress-bar-animated']} ${styles['progress-bar-striped']}`} />
        </div>
      </div>
    </div>
  )
}

export default Loader
