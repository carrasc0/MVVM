const db = require('../models/serverDB');

module.exports = function (app) {

    app.post('/loginFacebook', (req, res, next) => {
        res.json({
            error: false
        });
    });
}; 