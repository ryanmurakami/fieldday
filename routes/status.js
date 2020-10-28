const { getIsRunning } = require('../services/eventTracker');

//initialize
module.exports = function (router) {
    router.get('/status', status );
}

//APIs
function status (req, res) {   
    return res.status(200).json({
        status: {
            "isRunning": getIsRunning()
        }
    }); 
}