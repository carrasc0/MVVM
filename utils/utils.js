"use strict";
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
    let dLat = (lat2 - lat1).toRad();
    let dLng = (lng2 - lng1).toRad();
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distance = earthRadius * c;

    return distance;
};

Utils.getBoundaries = function (lat, lng, distance) {

    let returnData = Array();

    let cardinalCoords = new Array("0" /*north*/ , "180" /*south*/ , "90" /*east*/ , "270" /*west*/ );

    let rLat = Math.radians(lat);
    let rLng = Math.radians(lat);
    let rAngDist = distance / 6371;

    cardinalCoords.forEach((angle, index) => {

        let rAngle = angle.toRad;
        let rLatB = Math.asin(Math.sin(rLat) * Math.cos(rAngDist) + Math.cos(rLat) * Math.sin(rAngDist) * Math.cos(rAngle));
        let rLngB = rLng + Math.atan2(Math.sin(rAngle) * Math.sin(rAngDist) * Math.cos(rLat), Math.cos(rAngDist) - Math.sin(rLat) * Math.sin(rLatB));

        let returnCoordLat = new Array("lat" + index, Math.degrees(rLat) /*aqui va al reves de toRad (rad2deg)*/ );
        let returnCoordLng = new Array("lng" + index, Math.degrees(rLng) /*aqui va al reves de toRad (rad2deg)*/ );

        returnData.push(returnCoordLat, returnCoordLng);

    });

    return returnData;

}



module.exports = Utils;