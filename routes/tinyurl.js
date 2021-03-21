var express = require('express');
var router = express.Router();

const { createShortCode, updateStats } = require('../helper/shortUrl');
const { excecuteQuery, selectQuery } = require('../helper/dbOperation');

/* GET home page. */
router.post('/shorten', function (req, res, next) {
    //   res.render('index', { title: 'TinyURL' });
    let { url, shortcode } = req.body;
    //startDate, lastSeenDate, redirectCount
    let startDate = new Date().toISOString();

    if (url == "") {
        res.status(400).send({
            "Error": "URL is mandotory field"
        })
    }
    if (shortcode == undefined || shortcode == "") {
        shortcode = createShortCode();
        excecuteQuery(`Replace into URLShortner (url, shortcode, startDate) VALUES ('${url}', '${shortcode}', '${startDate}')`)
            .then(() => {
                res.status(201).send({
                    'shortcode': shortcode
                })

            })
            .catch(err => {
                console.log(err.message);
            })
    } else {


        if (shortcode.match(/^[0-9a-zA-Z_]{4,}$/) == null) {
            res.status(422).send({
                "ERROR": "Patter dosen't match"
            })
        }
        selectQuery(`SELECT id from URLShortner WHERE shortcode=?`, shortcode)
            .then((data) => {
                if (data && data.id) {
                    res.status(409).send({
                        "ERROR": "Already in USE"
                    })
                } else {
                    excecuteQuery(`Replace into URLShortner (url, shortcode, startDate) VALUES ('${url}', '${shortcode}', '${startDate}')`)
                        .then(() => {
                            res.status(201).send({
                                'shortcode': shortcode
                            })

                        })
                        .catch(err => {
                            console.log(err.message);

                        })
                }
            }).catch(err => {
                console.log(err.message);
            })
    }
});


router.get("/:shortcode", (req, res, next) => {
    let shortcode = req.params.shortcode;
    let url = '';
    selectQuery(`SELECT url from URLShortner WHERE shortcode=?`, shortcode)
        .then((row) => {
            if (row == undefined) {
                res.status(404).send({
                    "ERROR": "shortcode is not found in the system"
                })
                throw new Error();
            } else {
                url = row.url;
                return updateStats(shortcode);
            }
        }).then(() => {
            res.writeHead(302, { 'Location': url }).send();
        })
        .catch(err => {
            console.log(err.message);
        })

})

router.get("/:shortcode/stats", (req, res, next) => {
    let shortcode = req.params.shortcode;
    selectQuery(`SELECT * from URLShortner WHERE shortcode=?`, shortcode)
        .then((row) => {
            if (row == undefined) {
                res.status(404).send({
                    "ERROR": "shortcode is not found in the system"
                })
            }
            res.send(row);
        })
})

module.exports = router;
