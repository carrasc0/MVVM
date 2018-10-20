const db = require('../models/serverDB');
const fc = require('./serverFunctions');
const fcChat = require('./chatFunction');

//ssh-add ~/.ssh/id_rsa

module.exports = function (app) {

    app.post('/version', fc.version);

    //LOGIN

    app.post('/loginFacebook', fc.loginFacebook);

    app.post('/loginGoogle', fc.loginGoogle);

    app.post('/addUserFacebook', fc.addUserFacebook);

    app.post('/addUserGoogle', fc.addUserGoogle);

    //ADD

    app.post('/addRecord', fc.addRecord);

    app.post('/addImgUser', fc.addImgUser);

    app.post('/addInterestedEvent', fc.addInterestedEvent);

    app.post('/addViewEvent', fc.addViewEvent);

    //GET

    app.post('/getMatches', fc.getMatches);

    app.post('/getSolic', fc.getSolic);

    app.post('/getEvents', fc.getEvents);

    app.post('/getNotif', fc.getNotif);

    app.post('/getDataEdit', fc.getDataEdit);

    app.post('/getEventById', fc.getEventById);

    app.post('/getPeople', fc.getPeople);

    app.post('/getImgsUser', fc.getImgsUser);

    app.post('/getUser', fc.getUser);

    app.post('/getMatchesInviteEvent', fc.getMatchesInviteEvent);

    app.post('/inviteUsers', fc.inviteUsers);

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

    app.post('/updateInitInfo', fc.updateInitInfo);

    //DELETE

    app.post('/deleteImgUser', fc.deleteImgUser);

    app.post('/deleteProfile', fc.deleteProfile);

    //CHAT

    app.post('/openTalk', fcChat.openTalk);

    app.post('/upScrollChat', fcChat.upScrollChat);

    app.use(function (err, req, res, next) {
        console.error('ERROR: ' + err.stack);
        res.status(500).send('Something broke!');
    });

};