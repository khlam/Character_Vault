const router = require('express').Router();
const page_config = require('../page_config');

router.get('/:db_Name/:query', (req, res, next) => {
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

module.exports = router;
