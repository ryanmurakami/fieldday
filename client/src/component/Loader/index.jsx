import React from 'react'
import '../../static/loading-bar.min.css'
import '../../static/loading-bar.min.js'

import './overwrite.css'

function Loader ({ progress }) {
  return (
    <div>
      <div
        className='ldBar'
        data-value={progress}
        style={{ width: '75%', height: '36px' }}
      />
      <div>{progress}</div>
    </div>
  )
}

export default Loader
