import React from 'react'
import styles from './index.scss'

function Button (props) {
  const { text, type, action, wrapper = true } = props
  let alertStyle = ''

  if (type === 'alert') {
    alertStyle = styles['button-alert']
  }

  return (
    <div className={wrapper ? styles.wrapper : ''}>
      {
        action ?
          <button className={`${styles.button} ${alertStyle}`} onClick={action}>{text}</button>
        :
        <button className={`${styles.button} ${alertStyle}`} type="submit">{text}</button>
      }
    </div>
  )
}

export default Button
