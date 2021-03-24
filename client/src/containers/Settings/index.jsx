import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import { getAPI, postAPI } from '../../helper.js'

import Button from '../../component/Button/index.jsx'
import Heading from '../../component/Heading/index.jsx'

import styles from './index.scss'


// TODO: set loader
function Setting () {
  const [response, setResponse] = useState({ status: {} })

  const url = 'status'
  useEffect(() => {
    let mounted = true
    getAPI(url, (res) => {
      if (mounted) {
        setResponse(res)
      }
    })
    return () => {
      mounted = false
    }
  }, [response.status])

  let runButton = <Button text='Start' action={_startSimulator} />

  if (_.get(response, 'status.isRunning')) {
    runButton = <Button text='Stop' type='alert' action={_stopSimulator} />
  }

  return (
    <div className={`container ${styles.wrapper}`}>
      <Heading text='AWS Connection Status' />

      <div className={styles.p}>
        <dl className={styles.dl}>
          <dt className={styles.dt}>{_connectionRender(_.get(response, 'status.dynamoDB.status'))}</dt>
          <dd className={styles.dd}>
            DynamoDB Connection
            {_.get(response, 'status.dynamoDB.msg') &&
              <div>{_.get(response, 'status.dynamoDB.msg')}</div>}  
          </dd>
        </dl>
        <dl className={styles.dl}>
          <dt className={styles.dt}>{_connectionRender(false)}</dt>
          <dd className={styles.dd}>
            ElastiCache Connection
            { // TODO: set this to disable if false
              // TODO: set default value of endpoint if exist
              !_.get(response, 'status.dynamoDB.status') &&
              <form className={styles.form} onSubmit={_updateRedux}>
                <label htmlFor="endpoint">endpoint: </label>
                <input type="text" title="endpoint" name="endpoint" /> 
                <Button text="update"/>
              </form>
            }
          </dd>
        </dl>
        <dl className={styles.dl}>
          <dt className={styles.dt}>{_connectionRender(_.get(response, 'status.internet'))}</dt>
          <dd className={styles.dd}>Outside Internet Connection</dd>
        </dl>
      </div>

      <div className={styles.button} >
        <Button text='Refresh Connection' action={_refreshConnection} />
      </div>
      
      <Heading text='Field Day App Controls' />
      {runButton}
      <Button text='Reset' action={_resetSimulator} />
    </div>
  )
}

function _connectionRender (type) {
  if (type) {
    return (
      <div>
        <FontAwesomeIcon icon={faCheckCircle} color='#3FC1C9' />
      </div>
    )
  }

  return (
    <div>
      <FontAwesomeIcon icon={faTimesCircle} color='#FC5185' />
    </div>
  )
}

function _updateRedux (e) {
  e.preventDefault()
  const url = 'command/update'
  postAPI(url, { 'redis_url': e.target.endpoint.value }, () => {
    // TODO: update status 
  })
}

function _refreshConnection () {
  const url = 'command/reset'
  postAPI(url, {}, () => {})
  // Server will restart to initialize Redux,
  // force a reload after 5 second to homepage
  setTimeout(() => document.location.href="/", 5000);
  
}

function _startSimulator () {
  const url = 'commands/start'
  getAPI(url, (res) => {
    console.log(res)
  })
}

function _stopSimulator (setResponse) {
  const url = 'commands/stop'
  getAPI(url, (res) => {
    console.log(res)
  })
}

function _resetSimulator (setResponse) {
  const url = 'commands/reset'
  getAPI(url, (res) => {
    console.log(res)
  })
}

export default Setting
