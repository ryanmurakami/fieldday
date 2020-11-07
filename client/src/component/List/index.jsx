import React from 'react'

import styles from './index.scss'

function Image ({ items }) {
  return (
    <ol className={styles['number-list']}>
        {items &&
                items.map(function (result, index) {
                  return (
                    <li key={index}>
                      {result.name} - {_renderTime(result.time)}
                    </li>
                  )
                })}
      </ol>
  )
}

function _renderTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return <span>{minutes}:{seconds}</span>
}

export default Image
