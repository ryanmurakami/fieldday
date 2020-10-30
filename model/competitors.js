const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB();


function getCompetitors() {
    return new Promise(resolve => {
        const params = {
            TableName: "ec2fielddaydemo"
        }

        dynamoDB.scan(params, (err, result) => {
            if (err) {
                console.log(err, err.stack);

                const rawdata = fs.readFileSync(path.join(__dirname, '../', 'data', 'modified', 'competitors.json'));
                const competitors = JSON.parse(rawdata);

                resolve(competitors);
            }

            resolve(result.Items);
        });
    });
}

function saveCompetitors(competitors) {
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

                fs.writeFile(path.join(__dirname, '../', 'data', 'modified', 'competitors.json'), JSON.stringify(competitors), (error) => { 
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
    getCompetitors,
    saveCompetitors
}