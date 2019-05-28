const router = require('express').Router();
const page_config = require('../page_config');

router.post('/insert', (req, res, next) => {
    let table = req.body.destination;
    let data = req.body;
    delete data.destination;
    let columns = Object.keys(data).join(',');
    console.log(data);
    let values = Object.keys(data).map(key => `'${data[key]}'`).join(',');
    console.log(values);
    let db = req.app.get('db');
    let queryStr = `INSERT INTO ${table} (${columns}) VALUES (${values})`;
    db.connect(queryStr, (data) => {
        console.log(data);
    });
    res.redirect(`/${table}`);
});

router.get('/:HTTP_REFERER', (req, res, next) => {
    let HTTP_REFERER = req.params.HTTP_REFERER;
    let fKeys = page_config[HTTP_REFERER].fKeys;
    let db = req.app.get('db');
    let queryStr = `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS `
        + `WHERE TABLE_NAME = '${HTTP_REFERER}' AND COLUMN_NAME NOT LIKE '%id';`;
    if('fKeys' in page_config[HTTP_REFERER]){
        page_config[HTTP_REFERER].fKeys.forEach(fKey => {
            if (fKey.hasOwnProperty("displayName")){
                queryStr += `SELECT ${fKey.idColumn} AS value, ${fKey.displayName} AS name FROM ${fKey.table};`;
            }else {
                queryStr += `SELECT ${fKey.idColumn} AS value, ${fKey.idColumn} AS name FROM ${fKey.table};`;
            }
        });
    }
    db.connect(queryStr, (data) => {
        let context = {
            HTTP_REFERER: HTTP_REFERER, // path to page who referenced the form
            params: {
                title: `Add ${HTTP_REFERER} Item`,
            },
            fields: data
        };
        if('fKeys' in page_config[HTTP_REFERER]){
            let temp = data;
            let fields = temp.shift();
            let fKeyValues = {};
            let count = 0;
            temp.forEach(arg => {
                fKeyValues[fKeys[count].key] = [];

                arg.forEach(obj =>{
                    return fKeyValues[fKeys[count].key].push({value: obj.value, name: obj.name})
                });
                count += 1;
            });
            context.fields = fields;
            context.fk_fields = fKeyValues;
        }
        console.log(context)
        res.status(200).render('add_table_form', context);
    });
});

module.exports = router;
