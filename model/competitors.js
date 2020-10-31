const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB({ 'region': 'us-west-2' });
const unmarshallArray = require('../services/helper');


function getCompetitors() {
    return new Promise(resolve => {
        const params = {
            TableName: "fielddaydemo_competitors"
        }

        dynamoDB.scan(params, (err, result) => {
            if (err) {
                console.log(err, err.stack);

                const rawdata = fs.readFileSync(
                    path.join(__dirname, '../', 'data', 'modified', 'competitors.json'));
                const competitors = JSON.parse(rawdata);

                resolve(competitors);
            }

            resolve(unmarshallArray(result.Items));
        });
    });
}

function saveCompetitors(competitors) {
    const docConvert = AWS.DynamoDB.Converter;
    const putRequest = [];

    for (const i in competitors) {
        putRequest.push({
            PutRequest: {
                Item: docConvert.marshall(competitors[i])
            }
        });
    };

    const params = {
        RequestItems: {
            "fielddaydemo_competitors": putRequest
        }
    }

    return new Promise((resolve, reject) => {
        dynamoDB.batchWriteItem(params, function(err, data) {
            if (err) {
                console.log(err, err.stack); // an error occurred

                fs.writeFile(
                    path.join(__dirname, '../', 'data', 'modified', 'competitors.json'), 
                        JSON.stringify(competitors), (error) => { 
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