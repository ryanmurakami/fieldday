const fs = require('fs');
const path = require('path');

//initialize
module.exports = function (router) {
    router.get('/commands/:commands', command);
}

//APIs
function command(req, res) {
    return res.status(200).json({
        status: `get ${req.params.commands}`
    });
}

function reset(res) {
    return res.status(200).json({
        status: `State has been reset`
    });
}

// TODO: RESET
// TODO: START
// TODO: STOP