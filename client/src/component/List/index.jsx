import React from 'react'

import styles from './index.scss'

function Image ({ items }) {
  return (
    <ol className={styles['number-list']}>
      {items &&
                items.map(function (result, index) {
                  return (
                    <li key={index}>
                      {result.name} {_renderResult(result.time, result.rank)}
                    </li>
                  )
                })}
    </ol>
  )
}

function _renderResult (time, rank) {
  if (!time && !rank) {
    return <span>- Not Completed Yet</span>
  }

  return (
    <span>
      {rank && _renderRank(rank)} - {_renderTime(time)}
    </span>
  )
}

// TODO: if time and rank is null - replace with 'text'
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
