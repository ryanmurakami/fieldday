import React, { useState, useEffect } from 'react'
import { get } from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import { getAPI, postAPI } from '../../helper.js'

import Button from '../../component/Button/index.jsx'
import Heading from '../../component/Heading/index.jsx'

import styles from './index.scss'

function Setting () {
  const [response, setResponse] = useState({ status: {} })
  const [elastiCacheUrl, setElastiCacheUrl] = useState('')

  const url = 'status'
  useEffect(async () => {
    let mounted = true

    const res = await getAPI(url)
    if (mounted) {
      setResponse(res)
      setElastiCacheUrl(get(res, 'status.elastiCache.url'))
    }

    return () => mounted = false
  }, [])

  let runButton = <Button text='Start' action={_startSimulator(setResponse)} />

  if (get(response, 'status.isRunning')) {
    runButton = <Button text='Stop' type='alert' action={_stopSimulator(setResponse)} />
  }

  return (
    <div className={`container ${styles.wrapper}`}>
      <Heading text='AWS Connection Status' />

      <div className={styles.p}>
        <dl className={styles.dl}>
          <dt className={styles.dt}>{_connectionRender(get(response, 'status.dynamoDB.status'))}</dt>
          <dd className={styles.dd}>
            DynamoDB Connection
            {get(response, 'status.dynamoDB.msg') &&
              <div>{get(response, 'status.dynamoDB.msg')}</div>}
          </dd>
        </dl>
        <dl className={styles.dl}>
          <dt className={styles.dt}>{_connectionRender(get(response, 'status.elastiCache.status'))}</dt>
          <dd className={styles.dd}>
            ElastiCache Connection
            <span className={styles.endpoint}>endpoint:</span>
            <form
              className={styles.form}
              onSubmit={(e) => {
                e.preventDefault()
                _persistRedisEndpoint(elastiCacheUrl)
              }}>
              <input
                type="text" title="endpoint"
                name="endpoint" placeholder="fieldday.iotaqp.0001.usw2.cache.amazonaws.com"
                value={elastiCacheUrl}
                onChange={(e) => _RedisEndpointChange(e, setElastiCacheUrl)}/>
              <Button text='Update' type="submit" />
            </form>
          </dd>
        </dl>
        <dl className={styles.dl}>
          <dt className={styles.dt}>{_connectionRender(get(response, 'status.internet'))}</dt>
          <dd className={styles.dd}>Outside Internet Connection</dd>
        </dl>
        <dl className={styles.dl}>
          <dd className={styles.dd}>
            <Button text="Check Connections" action={_checkStatus(setResponse)} />
          </dd>
        </dl>
      </div>

      <Heading text='Field Day App Controls' />
      {runButton}
      <Button text='Reset' action={_resetSimulator(setResponse)} />
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

function _checkStatus (setResponse) {
  return async () => {
    const res = await getAPI('status')
    setResponse(res)
  }
}

function _startSimulator (setResponse) {
  return async () => {
    await getAPI('commands/start')
    setResponse(prev => {
      return { status: { ...prev.status, isRunning: true } }
    })
  }
}

function _stopSimulator (setResponse) {
  return async () => {
    await getAPI('commands/stop')
    setResponse(prev => {
      return { status: { ...prev.status, isRunning: false } }
    })
  }
}

function _resetSimulator (setResponse) {
  return async () => {
    await getAPI('commands/reset')
    setResponse(prev => {
      return { status: { ...prev.status, isRunning: false } }
    })
  }
}

async function _persistRedisEndpoint (elastiCacheUrl) {
  const res = await postAPI('commands/saveEndpoint', {
    elastiCacheUrl
  })

  setTimeout(() => document.location.href="/", 5000);
}

function _RedisEndpointChange(event, setElastiCacheUrl) {
  setElastiCacheUrl(event.target.value)
}

export default Setting
