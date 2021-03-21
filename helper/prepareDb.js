const { excecuteQuery } = require('./dbOperation');


dbSchema = `CREATE TABLE IF NOT EXISTS URLShortner (
    id integer NOT NULL PRIMARY KEY,
    url text NOT NULL UNIQUE,
    shortcode text NOT NULL,
    startDate Date NOT NULL UNIQUE,
    lastSeenDate Date,
    redirectCount integer
);`


const createSchema = () => {
    excecuteQuery(dbSchema, (err, _) => {
        if (err) {
            console.log(err.message);
        }
    });
}

module.exports = createSchema;