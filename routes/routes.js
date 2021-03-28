const express = require('express')
const router = express.Router()

router.get('/', (_, res) => {
  return res.status(200).json({
    status: 'success'
  })
})

// modules
require('./authentication')(router)
require('./commands')(router)
require('./competitors')(router)
require('./events')(router)
require('./health')(router)
require('./status')(router)

module.exports.router = router
