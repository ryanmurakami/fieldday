import React from 'react'

import styles from './index.scss'

function Image ({ items }) {
  return (
    <ol className={styles['number-list']}>
      {items &&
                items.map(function (result, index) {
                  return (
                    <li key={index}>
                      {result.name} {
                        result.rank && _renderRank(result.rank)
                      } - {_renderTime(result.time)}
                    </li>
                  )
                })}
    </ol>
  )
}

function _renderTime (totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return <span>{minutes}:{seconds}</span>
}

function _renderRank (rank) {
  let text
  switch (rank) {
    case '1':
      text = 'st'
      break
    case '2':
      text = 'nd'
      break
    case '3':
      text = 'rd'
      break
    default:
      text = 'th'
  }
  return <span>- {rank}{text} place</span>
}

export default Image
