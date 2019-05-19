const router = require('express').Router();
const page_config = require('./page_config');

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

router.get('/search/:db_Name/:query', (req, res, next) => {
    let dbName = req.params.db_Name
    let query = req.params.query
    let criteria = page_config[dbName].search

    if (page_config[dbName]) {
        let queryStr = `SELECT * FROM ${dbName} WHERE ${criteria} LIKE '%${query}%'`
        let db = req.app.get('db');

        db.pool.getConnection()
        .then (conn => {
            conn.query(queryStr)
                .then( data =>{
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(data))
                    conn.end();
                })
                .catch (e => {
                    console.error('Query error:', e.message, e.stack);
                    conn.end();
                });
        }).catch(e => {
            console.error('Connection error:', e.message, e.stack);
        });
    }
})

router.get('/:page', (req, res, next) => {
    let page = req.params.page;
    let params = page_config[page];
    let db = req.app.get('db');
    let queryStr = `SELECT * FROM ${page}`;
    if(params) {
        db.pool.getConnection()
            .then (conn => {
                conn.query(queryStr)
                    .then( data =>{
                        res.status(200).render('table_page', {
                            url: page, // reference to current page
                            paths: paths, // List of accepted paths
                            params: params, // Path specific parameters
                            data: data // database query results
                        });
                        conn.end();
                    })
                    .catch (e => {
                        console.error('Query error:', e.message, e.stack);
                        conn.end();
                    });
            }).catch(e => {
                console.error('Connection error:', e.message, e.stack);
            });
    } else {
        next();
    }
});

module.exports = router;
