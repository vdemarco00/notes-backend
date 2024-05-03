const sqlite3 = require('sqlite3').verbose()
require('dotenv').config()

let db = new sqlite3.Database(process.env.DBPATH, (err) => {
    if (err) {
        console.error(err.message)
        throw err
    }
    else {
        console.log('Connected to the SQLite database.')
    }
});

module.exports = db