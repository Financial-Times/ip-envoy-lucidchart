
const fs = require('fs');
const csv = require('csv-parser');
const logger = require('@financial-times/n-logger').default;
const { dbBuilder } = require('./builder');
const { preParser } = require('./parser');

module.exports = {
    initiateImport: (jouneyFilePath, knexConnection, callback) => {
        logger.info(`Importing file: ${csvFile}`);
        preParser.newCollection();
        fs.createReadStream(jouneyFilePath).pipe(csv()).on('data', (rowData) => {
        preParser.have(rowData);
        }).on('end', async () => { // We are done pulling in data
        if (await preParser.prepare(knexConnection)) {
            await dbBuilder.make(preParser.lucidCollectionPreped, knexConnection);
        }
        callback();
        });
    }
}
