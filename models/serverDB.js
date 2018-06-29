"use strict";
let conn = require('./config');
let db = {};

db.loginFacebook = (fb_id, cb) => {
    if (conn) {
        let sql = 'SELECT id_user FROM user WHERE fb_id = :fb_id';
        conn.query(sql, {
            fb_id: fb_id
        }, (err, rows) => {
            if (err) {
                cb(err, null);
            } else {
                cb(null, rows);
            }
        });
    } else {
        cb('Conexion inexistente', null);
    }

};

db.loginGoogle = (g_id, cb) => {
    if (conn) {
        let sql = 'SELECT id_user FROM user WHERE g_id = :g_id';
        conn.query(sql, {
            g_id: g_id
        }, (err, rows) => {
            if (err) {
                cb(err, null);
            } else {
                cb(null, rows);
            }
        });
    } else {
        cb('Conexion inexistente', null);
    }

};

//ADD

db.addRecord = (data, cb) => {
    if (conn) {
        let sql = 'INSERT INTO record (user_from, user_to, type) ' +
            'VALUES (:user_from, :user_to, :type)';
        conn.query(sql, {
            user_from: data.user_from,
            user_to: data.user_to,
            type: data.type
        }, (err, rows) => {
            if (err) {
                cb(err, null);
            } else {
                cb(null, rows);
            }
        });
    } else {
        cb('Conexion inexistente', null);
    }

};

//NUM ROWS

db.numRowsMatch = (id_user, cb) => {
    if (conn) {
        let sql = 'SELECT COUNT(*) as count FROM flech WHERE ' +
            'user_from = :id_user || user_to = :id_user';
        conn.query(sql, {
            user_from: id_user,
            user_to: id_user
        }, (err, rows) => {
            if (err) {
                cb(err, null);
            } else {
                cb(null, rows);
            }
        });
    } else {
        cb('Conexion inexistente', null);
    }

};

db.numRowsEvent = (id_user, cb) => {
    if (conn) {
        let sql = 'SELECT COUNT(*) as count FROM user_event WHERE ' +
            'id_user = :id_user';
        conn.query(sql, {
            id_user: id_user
        }, (err, rows) => {
            if (err) {
                cb(err, null);
            } else {
                cb(null, rows);
            }
        });
    } else {
        cb('Conexion inexistente', null);
    }

};

db.numRowsSolic = (id_user, cb) => {
    if (conn) {
        let sql = 'SELECT COUNT(*) as count FROM record WHERE ' +
            '(user_to = :id_user) AND ' +
            '(type != 1 && used = 0)';
        conn.query(sql, {
            user_from: id_user,
            user_to: id_user
        }, (err, rows) => {
            if (err) {
                cb(err, null);
            } else {
                cb(null, rows);
            }
        });
    } else {
        cb('Conexion inexistente', null);
    }

};

//GET

db.getMatches = (data, cb) => {
    if (conn) {
        let sql = 'SELECT f.id_flech, f.user_from, f.user_to, u.id_user, ' +
            'u.name, u.img, TIMESTAMPDIFF(YEAR,u.date_b,CURDATE()) AS age, u.last_login, ' +
            '(SELECT body FROM chat_logs WHERE (sender = :id_user || nickname = :id_user) AS preview ORDER BY created_at DESC LIMIT 1, ' +
            '(SELECT readed FROM chat_logs WHERE (sender = :id_user || nickname = :id_user) AS readed ORDER BY created_at DESC LIMIT 1, ' +
            'u.status FROM flech f, user u WHERE ' +
            '(f.user_from = :id_user || f.user_to = :id_user) && ' +
            '((f.user_from = u.id_user || f.user_to = u.id_user) && u.id_user != id_user) ' +
            'LIMIT :offset, :rows_per_page';
        conn.query(sql, {
            id_user: data.id_user,
            offset: data.offset,
            rows_per_page: data.rows_per_page
        }, (err, rows) => {
            if (err) {
                cb(err, null);
            } else {
                cb(null, rows);
            }
        });
    } else {
        cb('Conexion inexistente', null);
    }

};

db.getSolic = (data, cb) => {
    if (conn) {
        let sql = 'SELECT r.id_record, r.created_at, r.type, r.user_from, ' +
            'u.name, u.last_name, u.img, TIMESTAMPDIFF(YEAR,u.date_b,CURDATE()) AS age, ' +
            'u.prof, u.ocup FROM record r, user u WHERE ' +
            '(r.user_to = :id_user) AND (r.user_from = u.id_user) ORDER BY created_at ASC LIMIT :offset, :rows_per_page';
        conn.query(sql, {
            id_user: data.id_user,
            offset: data.offset,
            rows_per_page: data.rows_per_page
        }, (err, rows) => {
            if (err) {
                cb(err, null);
            } else {
                cb(null, rows);
            }
        });
    } else {
        cb('Conexion inexistente', null);
    }

};

db.getEvents = (data, cb) => {
    if (conn) {
        let sql = 'SELECT ue.id_event, e.created_at, e.img, e.name, ' +
            'e.date_b, e.date_e, e.vis, e.inter ' +
            'FROM user_event ue, event e WHERE ' +
            '(ue.id_user = :id_user) AND (ue.id_event = e.id_event) ORDER BY created_at ASC LIMIT :offset, :rows_per_page';
        conn.query(sql, {
            id_user: data.id_user,
            offset: data.offset,
            rows_per_page: data.rows_per_page
        }, (err, rows) => {
            if (err) {
                cb(err, null);
            } else {
                cb(null, rows);
            }
        });
    } else {
        cb('Conexion inexistente', null);
    }

};

db.getDataEdit = (id_user, cb) => {
    if (conn) {
        let sql = 'SELECT prof, ocup, iam, enjoy, partner ' +
            'FROM user WHERE id_user = :id_user';
        conn.query(sql, {
            id_user: id_user
        }, (err, rows) => {
            if (err) {
                cb(err, null);
            } else {
                cb(null, rows);
            }
        });
    } else {
        cb('Conexion inexistente', null);
    }

};

db.getEventById = (id_event, cb) => {

    if (conn) {
        let sql = 'SELECT id_event, created_at, img, name, place, date_b, date_e, body, ' +
            'type, vis, inter ' +
            'FROM event WHERE id_event = :id_event';
        conn.query(sql, {
            id_event: id_event
        }, (err, rows) => {
            if (err) {
                cb(err, null);
            } else {
                cb(null, rows);
            }
        });
    } else {
        cb('Conexion inexistente', null);
    }


};


db.getImgsEventsByIdEvent = (id_event, cb) => {

    if (conn) {
        let sql = 'SELECT path ' +
            'FROM event_img WHERE id_event = :id_event';
        conn.query(sql, {
            id_event: id_event
        }, (err, rows) => {
            if (err) {
                cb(err, null);
            } else {
                cb(null, rows);
            }
        });
    } else {
        cb('Conexion inexistente', null);
    }

};

db.getUsersForDetailEvent = (data, cb) => {

    if (conn) {
        let sql = 'SELECT u.id_user, u.name, u.img ' +
            'FROM user u, user_event_inter uei, flech f WHERE ' +
            '(uei.id_event = :id_event) AND ' +
            '(f.user_from = :id_user && f.user_to = uei.id_user) OR (f.user_from = uei.id_user && f.user_to = :id_user) AND ' +
            'uei.id_user != id_user';
        conn.query(sql, {
            id_event: data.id_event,
            id_user: data.id_user
        }, (err, rows) => {
            if (err) {
                cb(err, null);
            } else {
                cb(null, rows);
            }
        });
    } else {
        cb('Conexion inexistente', null);
    }

};

db.getPeopleWithCoordinates = (data, cb) => {

    if (conn) {

        let sql = `SELECT id_user, name, img, TIMESTAMPDIFF(YEAR,date_b,CURDATE()) AS age, prof, ocup ' +
            '(6371 * ACOS(SIN(RADIANS(ST_X(LOCATION))) * SIN(RADIANS(:lat)) + COS(RADIANS(ST_Y(location) - :lng)) ' +
            '* COS(RADIANS(ST_X(location))) * COS(RADIANS(:lat))))) as distance ' +
            'FROM user WHERE ' +
            '(id_user != :id_user) AND ' +
            '(TIMESTAMPDIFF(YEAR,date_b,CURDATE()) >= :min_age && TIMESTAMPDIFF(YEAR,date_b,CURDATE()) <= :max_age) AND ' +
            '(sex_pref = :sex && sex = :sex_pref) AND ' +
            'id_user != ALL (SELECT user_to WHERE user_from = :id_user) AND ' +
            '(ST_X(location) BETWEEN :min_lat AND :max_lat) AND ' +
            '(ST_Y(location) BETWEEN :min_lng AND :max_lng) AND ' +
            'HAVING distance < :distance ORDER BY distance ASC LIMIT 10`;

        conn.query(sql, {
            lat: data.lat,
            lng: data.lng,
            id_user: data.id_user,
            min_age: data.min_age,
            max_age: data.max_age,
            sex: data.sex,
            sex_pref: data.sex_pref,
            min_lat: data.box.min_lat,
            max_lat: data.box.max_lat,
            min_lng: data.box.min_lng,
            max_lng: data.box.max_lng

        }, (err, rows) => {
            if (err) {
                cb(err, null);
            } else {
                cb(null, rows);
            }
        });

    } else {
        cb('Conexion inexistente', null);
    }

};

db.getPeople = (data, cb) => {

    if (conn) {

        let sql = 'SELECT id_user, name, img, TIMESTAMPDIFF(YEAR,date_b,CURDATE()) AS age, prof, ocup ' +
            'FROM user WHERE ' +
            '(id_user != :id_user) AND ' +
            '(TIMESTAMPDIFF(YEAR,date_b,CURDATE()) >= :min_age && TIMESTAMPDIFF(YEAR,date_b,CURDATE()) <= :max_age) AND ' +
            '(sex_pref = :sex && sex = :sex_pref) AND ' +
            'id_user != ALL (SELECT user_to WHERE user_from = :id_user) AND ' +
            'ORDER BY created_at ASC LIMIT 10';

        conn.query(sql, {
            id_user: data.id_user,
            min_age: data.min_age,
            max_age: data.max_age,
            sex: data.sex,
            sex_pref: data.sex_pref
        }, (err, rows) => {
            if (err) {
                cb(err, null);
            } else {
                cb(null, rows);
            }
        });

    } else {
        cb('Conexion inexistente', null);
    }

};

module.exports = db;