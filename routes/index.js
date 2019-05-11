const router = require('express').Router();
const page_config = require('./page_config');
const testData = require('../testData');

const paths = Object.keys(page_config);

router.get('/', (req, res, next) => {
    res.status(200).render('home',{
        paths: paths
    });
});

router.get('/:page', (req, res, next) => {
    let page = req.params.page;
    let params = page_config[page];
    if(params){
        res.status(200).render('table_page', {
            paths: paths,
            // Path specific parameters such as page title
            params: params,
            // Path specific data: will be replaced by database
            // queries in the future
            data: testData[`${page}`]
        });
    } else {
        next();
    }
});

module.exports = router;
