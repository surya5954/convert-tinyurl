const { excecuteQuery, selectQuery } = require('./dbOperation');


const createShortCode = () => {
    let random_string = Math.random().toString(32).substring(2, 5) + Math.random().toString(32).substring(2, 5);
    return random_string;
}


const updateStats = (shortcode) => {
    let lastSeenDate = new Date().toISOString();
    let redirectCount = 1;
    selectQuery(`SELECT redirectCount from URLShortner where shortcode =?`, shortcode)
        .then(data => {
            if (data.redirectCount != null) {
                redirectCount = data.redirectCount + 1;
            }
            return excecuteQuery(`UPDATE URLShortner set lastSeenDate = '${lastSeenDate}', redirectCount = ${redirectCount} WHERE shortcode = '${shortcode}'`);
        })
        .then(() => {
            return true;
        })
        .catch((err) => {
            return false
        })
}





module.exports = { createShortCode, updateStats };