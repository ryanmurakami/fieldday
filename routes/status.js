const AWS = require('aws-sdk');
const { getIsRunning } = require('../services/eventTracker');
const dynamoDB = new AWS.DynamoDB({ 'region': 'us-west-2' });

//initialize
module.exports = function (router) {
    router.get('/status', status );
}

//APIs
async function status (req, res) {
    const dynamoConnection = await _checkDynamoConnection();

    return res.status(200).json({
        status: {
            "dynamoDB": dynamoConnection,
            "isRunning": getIsRunning()
        }
    });
}

function _checkDynamoConnection() {
    return new Promise(resolve => {
        const params = {
            TableName: "fieldDayDemo_event",
            Limit : 1
        };
    
        dynamoDB.scan(params, (err, data) => {
            if (err) {
                console.log(err, err.stack);
                resolve(false);
            }

            resolve(true);
        });
    });
}