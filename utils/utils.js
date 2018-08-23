"use strict";
const fs = require('fs');
const Jimp = require('jimp');
const moment = require('moment');
let Utils = {};

// Converts from degrees to radians.
Math.radians = function (degrees) {
    return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
Math.degrees = function (radians) {
    return radians * 180 / Math.PI;
};

Utils.getDistanciaEntreDosPuntos = function (lat1, lng1, lat2, lng2) {

    let earthRadius = 6371; // km
    let dLat = Math.radians(lat2 - lat1);
    let dLng = Math.radians(lng2 - lng1);
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(Math.radians(lat1)) * Math.cos(Math.radians(lat2)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distance = earthRadius * c;

    return distance;
};

Utils.getBoundaries = function (lat, lng, distance) {

    let returnData = Array();

    let cardinalCoords = new Array("0" /*north*/ , "180" /*south*/ , "90" /*east*/ , "270" /*west*/ );

    let rLat = Math.radians(lat);
    let rLng = Math.radians(lng);
    let rAngDist = distance / 6371;

    cardinalCoords.forEach((angle, index) => {

        let rAngle = Math.radians(angle);

        let rLatB = Math.asin(Math.sin(rLat) * Math.cos(rAngDist) + Math.cos(rLat) * Math.sin(rAngDist) * Math.cos(rAngle));
        let rLngB = rLng + Math.atan2(Math.sin(rAngle) * Math.sin(rAngDist) * Math.cos(rLat), Math.cos(rAngDist) - Math.sin(rLat) * Math.sin(rLatB));

        //let returnCoordLat = new Array("lat" + index, Math.degrees(rLatB) /*aqui va al reves de toRad (rad2deg)*/ );
        //let returnCoordLng = new Array("lng" + index, Math.degrees(rLngB) /*aqui va al reves de toRad (rad2deg)*/ );

        let returnCoordLat = Math.degrees(rLatB) /*aqui va al reves de toRad (rad2deg)*/ ;
        let returnCoordLng = Math.degrees(rLngB) /*aqui va al reves de toRad (rad2deg)*/ ;



        switch (index) {
            case 0:
                console.log('max_lat: ' + 'En: ' + cardinalCoords[0] + ' lat: ' + returnCoordLat + ' lng: ' + returnCoordLng);
                let max_lat = returnCoordLat;
                returnData.push(max_lat);
                break;
            case 1:
                console.log('min_lat: ' + 'En: ' + cardinalCoords[1] + ' lat: ' + returnCoordLat + ' lng: ' + returnCoordLng);
                let min_lat = returnCoordLat;
                returnData.push(min_lat);
                break;
            case 2:
                console.log('max_lng: ' + 'En: ' + cardinalCoords[2] + ' lat: ' + returnCoordLat + ' lng: ' + returnCoordLng);
                let max_lng = returnCoordLng;
                returnData.push(max_lng);
                break;
            case 3:
                console.log('min_lng: ' + 'En: ' + cardinalCoords[3] + ' lat: ' + returnCoordLat + ' lng: ' + returnCoordLng);
                let min_lng = returnCoordLng;
                returnData.push(min_lng);
                break;
        }
    });

    return returnData;

}

Utils.isSender = function (sender, id_user) {
    return parseInt(sender) === parseInt(id_user);
};

Utils.renameImg = function (old_path, new_path) {
    fs.renameSync(old_path, 'images/user/' + new_path);
};

Utils.reduceImg = function (path) {
    Jimp.read('images/user/' + path).then(function (image) {
        image.resize(Jimp.AUTO, 512);
        image.quality(80);
        image.exifRotate();
        image.normalize();
        image.write('images/user/' + path);
    }).catch(function (err) {
        // handle an exception
        console.log('JIMP error: ' + err);
    });
};

Utils.existsElementInArray = function (id_user, arreglo) {
    console.log('element: ' + String.toString(id_user));
    console.log('array: ' + arreglo.length);

    arreglo.forEach(msg => {
        console.log('msg: ' + msg.id_user);
        console.log('element: ' + id_user);
        console.log('ES IGUAL? ' + id_user == msg.id_user);
        console.log('ES IGUAL? ' + parseInt(id_user) === parseInt(msg.id_user));
        if (parseInt(id_user) === parseInt(msg.id_user)) {
            return true;
        }
    });
    return false;
};

Utils.formatTimeMsgChat = function (createdAt) {
    moment.locale('es');
    return moment(createdAt).format('h:mm a');
};

Utils.formatDateMsgChat = function (createdAt) {
    moment.locale('es');
    return moment(createdAt).format('LL');
};

Utils.formatDateNotif = function (createdAt) {
    moment.locale('es');
    return moment(createdAt).calendar();
};

Utils.formatDateMatch = function (createdAt) {
    moment.locale('es');
    return moment(createdAt).fromNow();
};

module.exports = Utils;