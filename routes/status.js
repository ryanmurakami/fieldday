//initialize
module.exports = function (router) {
    router.get('/status', status );
}

//APIs
function status (req, res) {    
    res.send("Get all status.");
}