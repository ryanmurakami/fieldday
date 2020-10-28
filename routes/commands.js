const { 
    resetEvent,
    stopEvent,
    startEvent
} = require('../services/eventTracker');
const fileLoader = require('../loaders/mock');

//initialize
module.exports = function (router) {
    router.get('/commands/:commands', command);
}

//APIs
function command(req, res) {
    if (req.params.commands === 'reset') {
        return reset(res);
    } else if (req.params.commands === 'stop') {
        return stop(res);
    } else if (req.params.commands === 'start') {
        return start(res);
    }

    return res.status(404).json({
        status: 'invalid command triggered'
    });
}

function reset(res) {
    resetEvent();
    fileLoader();

    return res.status(200).json({
        status: `State has been reset`
    });
}

function stop(res) {
    stopEvent();

    return res.status(200).json({
        status: `State has been stopped`
    });
}

function start(res) {
    startEvent();

    return res.status(200).json({
        status: `State has been stopped`
    });
}