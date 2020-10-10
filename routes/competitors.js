//initialize
module.exports = function (router) {
    router.get('/competitors', competitor);
    router.get('/competitors/:competitor_id', competitor);
}

//APIs
function competitor(req, res) {    
    if (req.params.competitor_id) {
        res.send(`get ${req.params.competitor_id}`);
    }

    res.send("Get all competitors.");
}