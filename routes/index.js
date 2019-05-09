const router = require('express').Router();
const paths = require('./paths');
const testData = require('../testData');

router.get('/', (req, res, next) => {
    res.status(200).render('home',{
        paths: paths
    });
});

router.get('/:path', (req, res, next) => {
    let path = req.params.path;
    if(paths.find(elem => elem['path'] == path)){
        res.status(200).render(`${path}`, {
            context: testData[`${path}`]
        });
    } else {
        next();
    }
});

module.exports = router;
