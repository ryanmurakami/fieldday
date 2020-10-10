//initialize
module.exports = function (router) {
    router.get('/competitors', competitor);
    router.get('/competitors/:competitor_id', competitor);
}

//APIs
function competitor(req, res) {    
    if (req.params.competitor_id) {
        return res.status(200).json({
            status: `get ${req.params.competitor_id}`
        });
    }

    return res.status(200).json({
        status: "Get all competitors."
    });
}