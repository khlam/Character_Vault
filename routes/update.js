const router = require('express').Router();
const page_config = require('../page_config');

router.post('/update', (req, res, next) => {
    // let table = req.body.destination;
    // let data = req.body;
    // delete data.destination;
    // let columns = Object.keys(data).join(',');
    // console.log(data);
    // let values = Object.keys(data).map(key => `'${data[key]}'`).join(',');
    // console.log(values);
    // let db = req.app.get('db');
    // let queryStr = `INSERT INTO ${table} (${columns}) VALUES (${values})`;
    // db.connect(queryStr, (data) => {
    //     console.log(data);
    // });
    // res.redirect(`/${table}`);
});

router.post('/:HTTP_REFERER', (req, res, next) => {
    let HTTP_REFERER = req.params.HTTP_REFERER;
    let itemId = req.body.itemid;
    let fKeys = page_config[HTTP_REFERER].fKeys;
    let db = req.app.get('db');

    let queryStr = `SELECT * `
        +`FROM ${HTTP_REFERER} `
        + `WHERE id = ${itemId};`;

    if('fKeys' in page_config[HTTP_REFERER]){
        page_config[HTTP_REFERER].fKeys.forEach(fKey => {
            queryStr += `SELECT ${fKey.idColumn} AS value FROM ${fKey.table};`;
        });
    }

    db.connect(queryStr, (data) => {
        let itemData = data.shift().shift();
        let fkData = {};
        page_config[HTTP_REFERER].fKeys.forEach (fKey => {
            fkData[fKey.key] = data.shift();
            fkData[fKey.key].unshift({value: itemData[fKey.key]});
            delete itemData[fKey.key];
        });

        let context = {
            HTTP_REFERER: HTTP_REFERER, // path to page who referenced the form
            params: {
                title: `Update ${HTTP_REFERER} Item`,
            },
            fields: itemData,
            fkFields: fkData
        };
        res.status(200).render('edit_table_form', context);
    });
});

module.exports = router;
