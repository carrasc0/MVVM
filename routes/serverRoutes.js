const db = require('../models/serverDB');
const fc = require('./serverFunctions');

module.exports = function (app) {

    //LOGIN

    app.post('/loginFacebook', fc.loginFacebook);

    app.post('/loginGoogle', fc.loginGoogle);

    app.post('/addUserFacebook', fc.addUserFacebook);

    app.post('/addUserGoogle', fc.addUserGoogle);


    //GET

    app.post('/getMatches', fc.getMatches);

    app.post('/getSolic', fc.getSolic);

    app.post('/getEvents', fc.getEvents);

    app.post('/getDataEdit', fc.getDataEdit);

    app.post('/getEventById', fc.getEventById);



};