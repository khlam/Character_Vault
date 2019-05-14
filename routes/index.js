const router = require('express').Router();
const page_config = require('./page_config');
const testData = require('../testData');

// List of available site path names
const paths = Object.keys(page_config);

router.get('/', (req, res, next) => {
    res.status(200).render('home',{
        // Pass in js objects to make them available
        // to handlebars templates.
        paths: paths
    });
});

router.get('/add-form/:HTTP_REFERER', (req, res, next) => {
    let HTTP_REFERER = req.params.HTTP_REFERER;

    // TODO will need to be replaced by a query that gets table field names
    let fields = Object.keys(testData[HTTP_REFERER][0]);
    res.status(200).render('add_table_form', {
        // path to page who referenced the form
        HTTP_REFERER: HTTP_REFERER,
        params: {
            title: `Add ${HTTP_REFERER} Item`
        },
        fields: fields
    });
});

router.post('/add-row', (req, res, next) => {
    let destination = req.body.destination;
    res.redirect(`/${destination}`);
});

router.get('/:page', (req, res, next) => {
    let page = req.params.page;
    let params = page_config[page];
    if(params){
        res.status(200).render('table_page', {
            // reference to current page
            url: page,
            // Pass in js objects to make them available
            // to handlebars templates.
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
