const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB();


function getEvents() {
    return new Promise(resolve => {
        const params = {
            TableName: "ec2fielddaydemo"
        }

        dynamoDB.scan(params, (err, result) => {
            if (err) {
                console.log(err, err.stack);

                const rawdata = fs.readFileSync(path.join(__dirname, '../', 'data', 'modified', 'events.json'));
                const events = JSON.parse(rawdata);

                resolve(events);
            }

            resolve(result.Items);
        });
    });
}

function saveEvents(events, cb) {
    const putRequest = [];

    for (const i in events) {
        putRequest.push({
            PutRequest: {
                Item: events[i] // TODO: marshall object to dynamo
            }
        });
    };

    const params = {
        RequestItems: {
            "ec2fielddaydemo": putRequest
        }
    }


    return new Promise((resolve, reject) => {
        dynamodb.batchWriteItem(params, function(err, data) {
            if (err) {
                console.log(err, err.stack); // an error occurred
                
                fs.writeFile(path.join(__dirname, '../', 'data', 'modified', 'events.json'), JSON.stringify(events), (error) => { 
                    // In case of a error throw err exception. 
                    if (error) {
                        reject('Error in saving file');
                    };
            
                    resolve();
                });
            } else {
                resolve();
            }
        });
    });    
}

module.exports = {
    getEvents,
    saveEvents
}