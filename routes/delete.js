const router = require('express').Router();

router.post('/:HTTP_REFERER', (req, res, next) => {
    let HTTP_REFERER = req.params.HTTP_REFERER;
    let delID = req.body.delID;
    console.log("HTTP_REFERER ", HTTP_REFERER)
    console.log("delID ", delID)

    let db = req.app.get('db');

    let queryStr = `DELETE `
        +`FROM ${HTTP_REFERER} `
        + `WHERE id = ${delID};`;
    
    db.connect(queryStr, (data) => {
        res.redirect(`/${HTTP_REFERER}`);
    })
})

module.exports = router;
