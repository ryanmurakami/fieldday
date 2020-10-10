//initialize
module.exports = function (router) {
    router.get('/commands/:commands', command);
}

//APIs
function command(req, res) {    
    res.send(`get ${req.params.commands}`);
}