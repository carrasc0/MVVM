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
            '(uei.id_event = :id_event && uei.id_user = f.) AND ' + 
            '(f.user_from)';
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

module.exports = db;