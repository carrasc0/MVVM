const db = require('../models/serverDB');
const utils = require('../utils/utils');
const multer = require('multer');
const fs = require('fs');
const fc = {};
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/users/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
const upload = multer({
    storage: storage
}).single('image');

//LOGIN

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

//ADD

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

fc.addImgUser = function (req, res, next) {
    upload(req, res, function (err) {
        if (err) {
            next(err);
        } else {
            //manage imagen
            let id_user = req.body.id_user;
            let pos = req.body.id_user;
            let new_path = 'user_' + id_user + '_' + pos + '.jpeg';
            //utils.renameImg(req.file.path, new_path);

            let dataImg = {
                path: new_path,
                pos,
                id_user
            };
            db.addImgUser(dataImg, (err, data) => {
                if (err) {
                    next(err);
                } else {
                    db.getImgUserById(data.insertId, (err, data) => {
                        if (err) {
                            next(err);
                        } else {
                            res.json({
                                error: false,
                                id_user_img: data[0].id_user_img,
                                path: data[0].path,
                                pos: data[0].pos
                            });
                        }

                    });
                }
            });
        }

    });
};

//GET

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

    console.log('body: ' + req.body);
    console.log('lat: ' + req.body.lat);

    if (lat !== 'null') {
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
                min_lat: box[1],
                max_lat: box[0],
                min_lng: box[3],
                max_lng: box[2]
            }

            db.getPeopleWithCoordinates(dataPeople, (err, data) => {
                if (err) {
                    next(err);
                } else {
                    console.log('Dist: ' + i + ' cantidad: ' + data.length);
                    returnData.push(data);
                }
            });

            if (returnData > 8) {
                break;
            }

        }

        res.json({
            exists: true,
            users: returnData
        });

    } else {
        //trabajar offline
        let dataPeople = {
            lat,
            lng,
            id_user,
            min_age,
            max_age,
            sex,
            sex_pref
        }
        db.getPeople(dataPeople, (err, data) => {
            console.log('data lenght: ' + data.length);
            if (err) {
                next(err);
            } else {
                if (data.length > 0) {
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

fc.getImgsUser = function (req, res, next) {

    let id_user = req.body.id_user;

    db.getImgsUser(id_user, (err, data) => {
        if (err) {
            next();
        } else {
            res.json({
                img: data[0].img,
                imgs: data
            });
        }

    });

};

//UPDATE

fc.updateLocation = function (req, res, next) {

    let id_user = req.body.id_user;
    let lat = req.body.lat;
    let lng = req.body.lng;

    let dataLocation = {
        lat,
        lng,
        id_user
    };

    db.updateLocation(dataLocation, (err, data) => {
        if (err) {
            next();
        } else {
            res.json({
                error: false
            });
        }
    });

};

fc.updateUserStatus = function (req, res, next) {

    let id_user = req.body.id_user;
    let status = req.body.status;

    let dataStatus = {
        status,
        id_user
    };

    db.updateUserStatus(dataStatus, (err, data) => {
        if (err) {
            next();
        } else {
            res.json({
                error: false
            });
        }
    });

};

fc.updateRewind = function (req, res, next) {

    let user_from = req.body.user_from;
    let user_to = req.body.user_to;

    let dataRewind = {
        user_from,
        user_to
    };

    db.updateRewind(dataRewind, (err, data) => {
        if (err) {
            next();
        } else {
            res.json({
                error: false
            });
        }
    });

};

fc.updateSettings = function (req, res, next) {

    let id_user = req.body.id_user;
    let min_age = req.body.min_age;
    let max_age = req.body.max_age;
    let sex_pref = req.body.sex_pref;

    let dataSettings = {
        min_age,
        max_age,
        sex_pref,
        id_user
    };

    db.updateSettings(dataSettings, (err, data) => {
        if (err) {
            next();
        } else {
            db.getDataAfterUpdateSettings(id_user, (err, data) => {
                if (err) {
                    next();
                } else {
                    res.json({
                        error: false,
                        min_age: data[0].min_age,
                        max_age: data[0].max_age,
                        sex_pref: data[0].sex_pref
                    })
                }

            });
        }

    });

};

fc.updateDataEdit = function (req, res, next) {

    let id_user = req.body.id_user;
    let prof = req.body.prof;
    let ocup = req.body.ocup;
    let iam = req.body.iam;
    let enjoy = req.body.enjoy;
    let partner = req.body.partner;

    let dataEdit = {
        prof,
        ocup,
        iam,
        enjoy,
        partner,
        id_user
    };

    db.updateEdit(dataEdit, (err, data) => {
        if (err) {
            next();
        } else {
            db.getDataAfterUpdateEdit(id_user, (err, data) => {
                if (err) {
                    next();
                } else {
                    res.json({
                        prof: data[0].prof,
                        ocup: data[0].ocup,
                        iam: data[0].iam,
                        enjoy: data[0].enjoy,
                        partner: data[0].partner
                    })
                }

            });
        }

    });

};

fc.updateLastLogin = function (req, res, next) {

    let id_user = req.body.id_user;

    db.updateLastLogin(id_user, (err, data) => {
        if (err) {
            next(err);
        } else {
            res.json({
                error: false
            });
        }
    });
};

fc.updateImgUser = function (req, res, next) {
    upload(req, res, function (err) {
        if (err) {
            next(err);
        } else {
            res.json({
                error: false
            });
        }

    });
};

//DELETE

fc.deleteImgUser = function (req, res, next) {

    let id_user = req.body.id_user;
    let pos = req.body.id_user;

    let path = 'user_' + id_user + '_' + pos + '.jpeg';

    fs.unlink(path, function (err) {
        if (err) {
            next(err);
        } else {
            let dataDelete = {
                id_user,
                pos
            };

            db.deleteImgUser(dataDelete, (err, data) => {
                if (err) {
                    next(err);
                } else {
                    res.json({
                        error: false
                    });
                }
            });
        }
    });
};

module.exports = fc;