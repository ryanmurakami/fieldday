import React from 'react'
import 'grd'
import Button from '../../component/Button/index.jsx';
import styles from './index.scss'

export default function render () {
  return (
    <div className={styles.container}>
      <div className='Grid -center'>
        <div className='Cell -6of12'>
          <div className={styles["login-form"]}>
            <h1>Login</h1>
            <form method="POST" action="/api/login">
              <label htmlFor="username">Username</label>
              <input type="text" title="username" name="username" placeholder="username" />
              <label htmlFor="password">Password</label>
              <input type="password" title="password" name="password" placeholder="password" />
              <div className="text-right">
                <Button text="submit" type="alert" wrapper={false}/>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}