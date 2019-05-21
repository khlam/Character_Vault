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
    let fKeys = page_config[HTTP_REFERER].fKeys;
    let db = req.app.get('db');
    let queryStr = `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS `
        + `WHERE TABLE_NAME = '${HTTP_REFERER}' AND COLUMN_NAME NOT LIKE '%id';`;
    page_config[HTTP_REFERER].fKeys.forEach(fKey => {
        queryStr += `SELECT ${fKey.idColumn} AS value FROM ${fKey.table};`;
    });
    db.connect(queryStr, (data) => {
        let temp = data;
        let fields = temp.shift();
        let fKeyValues = {};
        let count = 0;
        temp.forEach(arg => {
            fKeyValues[fKeys[count].key] = [];
            arg.forEach(obj => fKeyValues[fKeys[count].key].push(obj.value));
            count += 1;
        });
        res.status(200).render('add_table_form', {
            HTTP_REFERER: HTTP_REFERER, // path to page who referenced the form
            params: {
                title: `Add ${HTTP_REFERER} Item`,
            },
            fields: fields,
            fk_fields: fKeyValues
        });
    });
});

router.post('/add-row', (req, res, next) => {
    let table = req.body.destination;
    let data = req.body;
    delete data.destination;
    let columns = Object.keys(data).join(',');
    let values = Object.values(data).map(value => `'${value}'`).join(',');
    let db = req.app.get('db');
    let queryStr = `INSERT INTO ${table} (${columns}) VALUES (${values})`;
    db.connect(queryStr, (data) => {
        console.log(data);
    });
    res.redirect(`/${table}`);
});

router.get('/search/:db_Name/:query', (req, res, next) => {
    let dbName = req.params.db_Name;
    let query = req.params.query;
    let criteria = page_config[dbName].search;
    let searchCols = "";
    for (i in criteria) {
        searchCols = searchCols + criteria[i] + ` LIKE '%${query}%'`;
        if (i != (criteria.length - 1))
        {
            searchCols = searchCols + " OR ";
        }
    }

    if (page_config[dbName]) {
        let queryStr = `SELECT * FROM ${dbName} WHERE ${searchCols}`;
        let db = req.app.get('db');
        console.log(queryStr);	
		db.connect(queryStr, (data) => {
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(data));
        });
    }
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
