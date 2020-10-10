//initialize
module.exports = function (router) {
    router.get('/events', events);
    router.get('/events/:event_id', events);
}

//APIs
function events(req, res) {    
    if (req.params.event_id) {
        return res.status(200).json({
            status: `get ${req.params.event_id}`
        });
    }

    return res.status(200).json({
        status: "Get all events."
    });
}