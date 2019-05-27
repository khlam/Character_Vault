const router = require('express').Router();
const page_config = require('../page_config');

// List of available site path names
const paths = Object.keys(page_config);

router.get('/', (req, res, next) => {
    res.status(200).render('home',{
        // Pass in js objects to make them available
        // to handlebars templates.
        paths: paths
    });
});

router.get('/:page', (req, res, next) => {
    let page = req.params.page;
    let params = page_config[page];
    let db = req.app.get('db');
    let queryStr = `SELECT * FROM ${page}`;
    if(params) {
        db.connect(queryStr, (data) => {
            res.status(200).render('table_page', {
                url: page, // reference to current page
                paths: paths, // List of accepted paths
                params: params, // Path specific parameters
                data: data // database query results
            });
        });
    } else {
        next();
    }
});

module.exports = router;
