const express = require('express');
const cors = require('cors');
const path = require('path');

// start app
const app = express();

// port
const port = process.env.PORT || 5000;

app.use(cors());

// Serve static client files
app.use(express.static(path.join(__dirname, 'client', 'dist')));

app.get('/api/', (req, res) => {
    return res.status(200).json({
        status: "success"
    });
});

// Default if no match
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/dist", "index.html"))
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});