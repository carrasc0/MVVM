const db = require('../models/serverDB');
const fc = require('./serverFunctions');

module.exports = function (app) {

    //LOGIN

    app.post('/loginFacebook', fc.loginFacebook);

    app.post('/loginGoogle', fc.loginGoogle);

    app.post('/addUserFacebook', fc.addUserFacebook);

    app.post('/addUserGoogle', fc.addUserGoogle);

    //ADD

    app.post('/addRecord', fc.addRecord);

    app.post('/addImgUser', fc.addImgUser);

    //GET

    app.post('/getMatches', fc.getMatches);

    app.post('/getSolic', fc.getSolic);

    app.post('/getEvents', fc.getEvents);

    app.post('/getDataEdit', fc.getDataEdit);

    app.post('/getEventById', fc.getEventById);

    app.post('/getPeople', fc.getPeople);

    app.post('/getImgsUser', fc.getImgsUser);

    app.post('/getUser', fc.getUser);

    //UPDATE

    app.post('/updateLocation', fc.updateLocation);

    app.post('/updateUserStatus', fc.updateUserStatus);

    app.post('/updateRewind', fc.updateRewind);

    app.post('/updateSettings', fc.updateSettings);

    app.post('/updateDataEdit', fc.updateDataEdit);

    app.post('/updateImgUser', fc.updateImgUser);

    app.post('/updateLastLogin', fc.updateLastLogin);

    app.post('/updateDeniedSolic', fc.updateDeniedSolic);

    app.post('/updateAcceptedSolic', fc.updateAcceptedSolic);

    //DELETE

    app.post('/deleteImgUser', fc.deleteImgUser);

    app.use(function (err, req, res, next) {
        console.error('ERROR: ' + err.stack);
        res.status(500).send('Something broke!');
    });

};