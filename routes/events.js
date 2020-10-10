//initialize
module.exports = function (router) {
    router.get('/events', events);
    router.get('/events/:event_id', events);
}

//APIs
function events(req, res) {    
    if (req.params.event_id) {
        res.send(`get ${req.params.event_id}`);
    }

    res.send("Get all events.");
}