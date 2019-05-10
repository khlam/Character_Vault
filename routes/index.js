const router = require('express').Router();
const paths = require('./paths');
const testData = require('../testData');

router.get('/', (req, res, next) => {
    res.status(200).render('home',{
        data: paths
    });
});

router.get('/:path', (req, res, next) => {
    let path = req.params.path;
    if(paths[path]){
        res.status(200).render('table_page', {
            // Path specific parameters such as page title
            params: paths[path],
            // Path specific data: will be replaced by database
            // queries in the future
            data: testData[`${path}`]
        });
    } else {
        next();
    }
});

module.exports = router;
