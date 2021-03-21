
const excecuteQuery = (sql) => {
    return new Promise((resolve, reject) => {
        const sqlite3 = require('sqlite3').verbose();
        console.log(sql);
        let db = new sqlite3.Database('./sqlite.db', (err) => {
            if (err) {
                return reject(err.message);
            }
            console.log('Connected to the in-memory SQlite database.');
        });
        db.serialize(() => {
            db.run(sql, (err, row) => {
                if (err) {
                    // console.error(err.message);
                    return reject(err.message);
                }
                console.log(row);
                return resolve(row);
            });
        });

        db.close((err) => {
            if (err) {
                return reject(err.message);
            }
            console.log('Close the database connection.');
        });
    })
}

const selectQuery = (sql, param) => {
    return new Promise((resolve, reject) => {
        const sqlite3 = require('sqlite3').verbose();
        console.log(sql);
        let db = new sqlite3.Database('./sqlite.db', (err) => {
            if (err) {
                return reject(err.message);
            }
            console.log('Connected to the in-memory SQlite database.');
        });
        db.serialize(() => {
            db.get(sql, param, (err, row) => {
                if (err) {
                    return reject(err.message);
                }
                console.log(row);
                return resolve(row);
            });
        });

        db.close((err) => {
            if (err) {
                return reject(err.message);
            }
            console.log('Close the database connection.');
        });
    })
}

module.exports = { excecuteQuery, selectQuery };


