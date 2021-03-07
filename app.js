require('dotenv').config()

const express = require('express')
const cors = require('cors')
const path = require('path')
const v1 = require('./routes/routes')
const loader = require('./loaders/mock')
const { logger } = require('./services/helper')

// Set data
loader()

// start app
const app = express()

// port
const port = 3000

app.use(express.json())
app.use(cors())

// Serve static client files
app.use(express.static(path.join(__dirname, 'client', 'dist')))
app.use(express.static(path.join(__dirname, 'client', 'src', 'static')))

app.use('/api', v1.router)

// Default if no match
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'))
})

app.listen(port, () => {
  logger.info(`Listening on port ${port}`)
})
