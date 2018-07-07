const db = require('../models/serverDB');
const utils = require('../utils/utils');
const multer = require('multer');
const fs = require('fs');
const fc = {};
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/user/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({
    storage: storage
}).single('image');

//LOGIN

//working
fc.loginFacebook = function (req, res, next) {

    let fb_id = req.body.fb_id;
    db.loginFacebook(fb_id, (err, data) => {
        if (err) {
            next(err);
        } else {
            console.log(data);
            console.log(data[0]);
            if (data[0]) {
                //exists
                db.getUserAfterLoginFacebook(fb_id, (err, data) => {
                    if (err) {
                        next(err);
                    } else {
                        res.json({
                            isUser: true,
                            user: data[0]
                        });
                    }
                });
            } else {
                res.json({
                    isUser: false,
                    user: []
                });
            }
        }

    });
};

//working
fc.loginGoogle = function (req, res, next) {

    let g_id = req.body.g_id;

    db.loginGoogle(g_id, (err, data) => {
        if (err) {
            next(err);
        } else {
            if (data[0]) {
                //exists
                db.getUserAfterLoginGoogle(g_id, (err, data) => {
                    if (err) {
                        next(err);
                    } else {
                        res.json({
                            isUser: true,
                            user: data[0]
                        });
                    }
                });
            } else {
                res.json({
                    isUser: false,
                    user: []
                });
            }
        }

    });
};


fc.addUserFacebook = function (req, res, next) {
    upload(req, res, function (err) {
        if (err) {
            next(err);
        } else {
            console.log(req.body);
            console.log(req.body.user);
            let user = JSON.parse(req.body.user);
            console.log('name: ' + user.name);
            let dataAddUser = {
                email: user.email,
                img: 'user_def.jpeg',
                name: user.name,
                last_name: user.last_name,
                date_b: user.date_b,
                prof: user.prof,
                ocup: user.ocup,
                sex: user.sex,
                sex_pref: user.sex_pref,
                min_age: user.min_age,
                max_age: user.max_age,
                fb_id: user.fb_id
            };

            db.addUserFacebook(dataAddUser, (err, data) => {
                if (err) {
                    next(err);
                } else {
                    let newId = data.insertId;
                    utils.renameImg(req.file.path, 'user_' + newId + '.jpeg');

                    let dataImg = {
                        img: 'user_' + newId + '.jpeg',
                        id_user: newId
                    };

                    db.updateImgUserAfterAddNewUser(dataImg, (err, data) => {
                        if (err) {
                            next(err);
                        } else {
                            db.getUserAfterAddNewUser(newId, (err, data) => {
                                if (err) {
                                    next(err);
                                } else {
                                    res.json({
                                        error: false,
                                        user: data[0]
                                    });
                                    utils.reduceImg('user_' + newId + '.jpeg');
                                }
                            });
                        }
                    });

                }
            });

        }
    });
};


fc.addUserGoogle = function (req, res, next) {

    upload(req, res, function (err) {
        if (err) {
            next(err);
        } else {
            let email = req.body.email;
            let img = req.file.filename;
            let name = req.body.name;
            let last_name = req.body.last_name;
            let date_b = req.body.date_b;
            let prof = req.body.prof;
            let ocup = req.body.ocup;
            let sex = req.body.sex;
            let sex_pref = req.body.sex_pref;
            let min_age = req.body.min_age;
            let max_age = req.body.max_age;
            let g_id = req.body.g_id;


            let dataAddUser = {
                email,
                img,
                name,
                last_name,
                date_b,
                prof,
                ocup,
                sex,
                sex_pref,
                min_age,
                max_age,
                g_id
            };

            db.addUserGoogle(dataAddUser, (err, data) => {
                if (err) {
                    next(err);
                } else {
                    let newId = data.insertId;
                    db.getUserAfterAddNewUser(newId, (err, data) => {
                        if (err) {
                            next(err);
                        } else {
                            res.json({
                                error: false,
                                user: data[0]
                            });
                        }
                    });
                }
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

        var returnData = new Array();

        for (let i = 100; i <= 700; i += 200) {

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
                max_lng: box[2],
                dist: i
            }

            db.getPeopleWithCoordinates(dataPeople, (err, data) => {
                if (err) {
                    next(err);
                } else {
                    console.log('Dist: ' + i + ' cantidad: ' + data.length);
                    data.forEach(msg => {
                        console.log('element ' + JSON.stringify(msg));
                        console.log('INCLUDES: ' + returnData.indexOf(msg));

                        if (returnData.length > 0) {



                        } else {
                            returnData.push(msg);
                        }

                        console.log('LWNGHT: ' + returnData.length);
                    });

                    if (i === 700) {
                        console.log('antes del res ' + returnData.length + ' dist: ' + i);
                        res.json({
                            exists: true,
                            users: returnData
                        });
                    }

                }
            });

        }

        console.log('fuera del for: ' + returnData.length);

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
            if (err) {
                next(err);
            } else {
                console.log('data lenght: ' + data.length);
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

fc.updateDeniedSolic = function (req, res, next) {

    let id_record = req.body.id_record;
    db.updateDeniedSolic(id_record, (err, data) => {
        if (err) {
            next(err);
        } else {
            res.json({
                error: false
            });
        }
    });
};

fc.updateAcceptedSolic = function (req, res, next) {

    let id_record = req.body.id_record;
    db.updateAcceptedSolic(id_record, (err, data) => {
        if (err) {
            next(err);
        } else {
            db.getDataAfterAddMatch(id_record, (err, data) => {
                if (err) {
                    next(err);
                } else {
                    res.json({
                        error: false,
                        user_from: data[0],
                        user_to: data[1]
                    });
                }
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