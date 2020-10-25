const express = require('express');
const cors = require('cors');
const path = require('path');
const v1 = require('./routes/routes');


// start app
const app = express();

// port
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Serve static client files
app.use(express.static(path.join(__dirname, 'client', 'dist')));

app.use('/api', v1.router)

// Default if no match
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/dist", "index.html"))
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});