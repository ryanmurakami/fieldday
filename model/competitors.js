const fs = require('fs');
const path = require('path');


function getCompetitors() {
    const rawdata = fs.readFileSync(path.join(__dirname, '../', 'data', 'modified', 'competitors.json'));
    const competitors = JSON.parse(rawdata);

    return competitors;
}

function saveCompetitors(competitors, cb) {
    fs.writeFile(path.join(__dirname, '../', 'data', 'modified', 'competitors.json'), JSON.stringify(competitors), (error) => { 
        // In case of a error throw err exception. 
        if (error) {
            throw 'error saving event';
        };

        cb();
    });
}

module.exports = {
    getCompetitors,
    saveCompetitors
}