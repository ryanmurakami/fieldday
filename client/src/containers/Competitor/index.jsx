import React, { useState, useEffect } from 'react'
import 'grd'

import { getAPI } from '../../helper.js'

import Image from '../../component/Image/index.jsx'
import Divider from '../../component/Divider/index.jsx'

import styles from './index.scss'

function CompetitorContainer () {
  const [response, setResponse] = useState({ message: 'Oops, something went wrong...' })

  useEffect(async () => {
    let mounted = true

    const res = await getAPI('competitors')
    if (mounted) setResponse(res)

    return () => mounted = false
  }, [])

  const competitors = response?.body || []
  const renderCompetitors = competitors.map(function (competitor, index) {
    return (
      <div key={index} className='Cell -3of12'>
        <Image
          className={styles.image}
          image={competitor.image}
          link={`/competitors/${competitor.id}`}
          subtitle={competitor.name}
        />
      </div>
    )
  })

  return (
    <div className={styles.container}>
      <Divider text='Competitors' />
      <div className='Grid -middle'>
        {renderCompetitors}
      </div>
    </div>
  )
}

export default CompetitorContainer
