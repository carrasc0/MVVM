const db = require('../models/serverDB');
const utils = require('../utils/utils');
const fc = {};

fc.loginFacebook = function (req, res, next) {

    let fb_id = req.body.fb_id;
    db.loginFacebook(fb_id, (err, data) => {
        if (err) {
            next();
        } else {
            res.json({
                error: false,
                data: data
            });
        }

    });
};

fc.loginGoogle = function (req, res, next) {

    let g_id = req.body.g_id;
    db.loginGoogle(g_id, (err, data) => {
        if (err) {
            next();
        } else {
            res.json({
                error: false,
                data: data
            });
        }

    });
};

fc.addUserFacebook = function (req, res, next) {

    let fb_id = req.body_fb_id;
    db.loginFacebook(fb_id, (err, data) => {
        if (err) {
            next();
        } else {
            res.json({
                error: false,
                data: data
            });
        }

    });
};

fc.addUserGoogle = function (req, res, next) {

    let fb_id = req.body_fb_id;
    db.loginFacebook(fb_id, (err, data) => {
        if (err) {
            next();
        } else {
            res.json({
                error: false,
                data: data
            });
        }

    });
};

fc.addRecord = function (req, res, next) {

    let user_from = req.body.user_from;
    let user_to = req.body.user_to;
    let type = req.body.type;

    let dataRecord = {
        user_from,
        user_to,
        type
    };

    db.addRecord(dataRecord, (err, rows) => {
        if (err) {
            res.json({
                error: false
            });
        } else {
            res.json({
                error: false
            });
        }
    });

};

fc.getMatches = function (req, res, next) {

    let id_user = req.body.id_user;
    let page = req.body.page;



    db.numRowsMatch(id_user, (err, data) => {
        if (err) {
            next();
        } else {
            if (data.count > 0) {

                let rows_per_page = 10;
                let num_rows = data.count;
                let total_pages = Math.ceil(num_rows / rows_per_page);
                let offset = page * rows_per_page;

                let dataMatch = {
                    id_user,
                    offset,
                    rows_per_page
                };

                db.getMatches(dataMatch, (err, data) => {
                    if (err) {
                        next();
                    } else {
                        res.json({
                            exists: true,
                            total_pages: total_pages,
                            num_rows: num_rows,
                            matches: data
                        });
                    }

                });

            } else {
                res.json({
                    exists: false
                });
            }
        }

    });

    db.addRecord(dataRecord, (err, rows) => {
        if (err) {
            res.json({
                error: true
            });
        } else {
            res.json({
                error: false
            });
        }
    });

};

fc.getSolic = function (req, res, next) {

    let id_user = req.body.id_user;
    let lat = req.body.lat;
    let lng = req.body.lng;
    let page = req.body.page;

    db.numRowsSolic(id_user, (err, data) => {
        if (err) {
            next();
        } else {
            if (data.count > 0) {

                let rows_per_page = 10;
                let num_rows = data.count;
                let total_pages = Math.ceil(num_rows / rows_per_page);
                let offset = page * rows_per_page;

                let dataMatch = {
                    id_user,
                    offset,
                    rows_per_page
                };

                db.getSolic(dataMatch, (err, data) => {
                    if (err) {
                        next();
                    } else {
                        res.json({
                            exists: true,
                            total_pages: total_pages,
                            num_rows: num_rows,
                            solics: data
                        });
                    }

                });

            } else {
                res.json({
                    exists: false
                });
            }
        }

    });

};

fc.getEvents = function (req, res, next) {

    let id_user = req.body.id_user;
    let lat = req.body.lat;
    let lng = req.body.lng;
    let page = req.body.page;

    db.numRowsEvent(id_user, (err, data) => {
        if (err) {
            next();
        } else {
            if (data.count > 0) {

                let rows_per_page = 6;
                let num_rows = data.count;
                let total_pages = Math.ceil(num_rows / rows_per_page);
                let offset = page * rows_per_page;

                let dataEvent = {
                    id_user,
                    offset,
                    rows_per_page
                };

                db.getEvents(dataEvent, (err, data) => {
                    if (err) {
                        next();
                    } else {
                        res.json({
                            exists: true,
                            total_pages: total_pages,
                            num_rows: num_rows,
                            events: data
                        });
                    }

                });

            } else {
                res.json({
                    exists: false
                });
            }
        }

    });

};

fc.getDataEdit = function (req, res, next) {

    let id_user = req.body.id_user;

    db.getDataEdit(id_user, (err, data) => {
        if (err) {
            next();
        } else {
            res.json({
                data
            });
        }

    });

};

fc.getEventById = function (req, res, next) {

    let id_event = req.body.id_event;
    let id_user = req.body.id_user;

    //evento
    db.getEventById(id_event, (err, data) => {
        if (err) {
            next();
        } else {
            //imagenes del evento
            db.getImgsEventsByIdEvent(id_event, (err, dataImg) => {
                if (err) {
                    next();
                } else {
                    //usuarios match que les interese el evento
                    let dataUsers = {
                        id_event,
                        id_user
                    };
                    db.getUsersForDetailEvent(dataUsers, (err, dataUsers) => {
                        if (err) {
                            next();
                        } else {
                            //enviado peticion
                            res.json({
                                event: data[0],
                                imgs: dataImg,
                                users: dataUsers
                            })
                        }

                    });
                }

            });
        }

    });

};

fc.getPeople = function (req, res, next) {

    let id_user = req.body.id_user;
    let lat = req.body.lat;
    let lng = req.body.lng;
    let sex = req.body.sex;
    let sex_pref = req.body.sex_pref;
    let min_age = req.body.min_age;
    let max_age = req.body.max_age;

    if (lat) {
        //trabajar online

        let returnData = Array();

        for (let i = 100; i < 700; i += 200) {

            let box = utils.getBoundaries(lat, lng, i);
            let dataPeople = {
                lat,
                lng,
                id_user,
                min_age,
                max_age,
                sex,
                sex_pref,
                box
            }

            db.getPeopleWithCoordinates(dataPeople, (err, data) => {
                if (err) {
                    next();
                } else {
                    returnData.push(data);
                }
            });

            if (returnData > 8) {
                res.json({
                    exists: true,
                    users: returnData
                });
            }

        }

    } else {
        //trabajar offline
        let dataPeople = {
            lat,
            lng,
            id_user,
            min_age,
            max_age,
            sex,
            sex_pref,
            box
        }
        db.getPeople(dataPeople, (err, data) => {
            if (err) {
                next();
            } else {
                if (data.lenght > 0) {
                    res.json({
                        exists: true,
                        users: data
                    });
                } else {
                    res.json({
                        exists: false,
                        users: new Array()
                    })
                }
            }
        })
    }

};

module.exports = fc;