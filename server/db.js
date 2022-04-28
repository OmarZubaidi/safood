const fs = require('fs');
const db = JSON.parse(fs.readFileSync('../json/dataset.json'));
module.exports = db;
