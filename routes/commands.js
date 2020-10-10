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