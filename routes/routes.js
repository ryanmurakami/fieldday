const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  return res.status(200).json({
    status: 'success'
  })
})

// modules
require('./events')(router)
require('./competitors')(router)
require('./status')(router)
require('./commands')(router)
require('./authentication')(router)

module.exports.router = router
