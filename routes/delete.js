const router = require('express').Router();

router.post('/:HTTP_REFERER', (req, res, next) => {
    let HTTP_REFERER = req.params.HTTP_REFERER;
    console.log(req.body.delID);
    // below removes appending prepending commas, splits on comma.
    let delID = req.body.delID.replace(/(^,)|(,$)/g, "").split(','); 
    console.log("HTTP_REFERER ", HTTP_REFERER);
    console.log("delID ", delID);

    let db = req.app.get('db');
    let queryStr;

    if (HTTP_REFERER == 'characters'){
        queryStr = `DELETE `
            +`FROM ${HTTP_REFERER} `
            + `WHERE id = ${delID};`;
    } else if (HTTP_REFERER == 'character_skill'){
        queryStr = `DELETE `
            +`FROM ${HTTP_REFERER} `
            + `WHERE character_id = ${delID[0]} AND skill_id = '${delID[1]}';`;
    } else if (HTTP_REFERER == 'race'){
        queryStr = `DELETE `
            +`FROM ${HTTP_REFERER} `
            + `WHERE name = '${delID}';`;
}

    db.connect(queryStr, (data) => {
        res.redirect(`/${HTTP_REFERER}`);
    });
});

module.exports = router;
