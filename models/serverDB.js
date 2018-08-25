"use strict";
let conn = require('./config');
let db = {};

//LOGIN

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

db.getUserAfterLoginFacebook = (fb_id, cb) => {
    if (conn) {
        let sql = 'SELECT u.id_user, u.name, u.last_name, u.img, TIMESTAMPDIFF(YEAR,u.date_b,CURDATE()) AS age, ' +
            'u.min_age, u.max_age, u.sex, u.sex_pref, u.prof, u.ocup, ud.iam, ud.enjoy, ud.partner ' +
            'FROM user u, user_data ud WHERE (u.fb_id = :fb_id) AND (u.id_user = ud.id_user)';
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

db.getUserAfterLoginGoogle = (g_id, cb) => {
    if (conn) {
        let sql = 'SELECT id_user, name, last_name, img, TIMESTAMPDIFF(YEAR,date_b,CURDATE()) AS age, ' +
            'min_age, max_age, sex, sex_pref FROM user WHERE g_id = :g_id';
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

db.getUserAfterAddNewUser = (id_user, cb) => {
    if (conn) {
        let sql = 'SELECT id_user, name, last_name, img, TIMESTAMPDIFF(YEAR, date_b,CURDATE()) AS age, ' +
            'min_age, max_age, sex, sex_pref FROM user WHERE id_user = :id_user';
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

db.addUserFacebook = (data, cb) => {
    if (conn) {
        console.log(data);
        let sql;

        if (data.email !== 'null') {
            sql = 'INSERT INTO user (email, img, name, last_name, date_b, prof, ' +
                'ocup, sex, sex_pref, min_age, max_age, fb_id) ' +
                'VALUES (:email, :img, :name, :last_name, :date_b, :prof, ' +
                ':ocup, :sex, :sex_pref, :min_age, :max_age, :fb_id)';
        } else {
            sql = 'INSERT INTO user (img, name, last_name, date_b, prof, ' +
                'ocup, sex, sex_pref, min_age, max_age, fb_id) ' +
                'VALUES (:img, :name, :last_name, :date_b, :prof, ' +
                ':ocup, :sex, :sex_pref, :min_age, :max_age, :fb_id)';
        }

        conn.query(sql, {
            email: data.email,
            img: data.img,
            name: data.name,
            last_name: data.last_name,
            date_b: data.date_b,
            prof: data.prof,
            ocup: data.ocup,
            sex: data.sex,
            sex_pref: data.sex_pref,
            min_age: data.min_age,
            max_age: data.max_age,
            fb_id: data.fb_id

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

db.addUserGoogle = (data, cb) => {
    if (conn) {

        let sql = 'INSERT INTO user (email, img, name, last_name, date_b, prof, ' +
            'ocup, sex, sex_pref, min_age, max_age, g_id) ' +
            'VALUES (:email, :img, :name, :last_name, :date_b, :prof, ' +
            ':ocup, :sex, :sex_pref, :min_age, :max_age, :g_id)';


        conn.query(sql, {
            email: data.email,
            img: data.img,
            name: data.name,
            last_name: data.last_name,
            date_b: data.date_b,
            prof: data.prof,
            ocup: data.ocup,
            sex: data.sex,
            sex_pref: data.sex_pref,
            min_age: data.min_age,
            max_age: data.max_age,
            g_id: data.g_id

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

db.addInterestedEvent = (data, cb) => {
    if (conn) {
        let sql = 'INSERT INTO user_event_inter (id_user, id_event) ' +
            'VALUES (:id_user, :id_event)';
        conn.query(sql, {
            id_user: data.id_user,
            id_event: data.id_event
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

db.addImgUser = (data, cb) => {
    if (conn) {
        let sql = 'INSERT INTO user_img (path, pos, id_user) ' +
            'VALUES (:path, :pos, :id_user)';
        conn.query(sql, {
            path: data.path,
            pos: data.pos,
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

db.addMatch = (data, cb) => {
    if (conn) {
        let sql = 'INSERT INTO flech (user_from, user_to) ' +
            'VALUES (:user_from, :user_to)';
        conn.query(sql, {
            user_from: data.user_from,
            user_to: data.user_to
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
        let sql = 'SELECT COUNT(*) AS count FROM flech WHERE ' +
            'user_from = :id_user OR user_to = :id_user';
        conn.query(sql, {
            id_user: id_user
        }, (err, rows) => {
            if (err) {
                cb(err, null);
            } else {
                console.log('FLECH COUNT: ' + rows);
                console.log('FLECH COUNT: ' + rows[0]);
                cb(null, rows);
            }
        });
    } else {
        cb('Conexion inexistente', null);
    }

};

db.numRowsNotif = (id_user, cb) => {
    if (conn) {
        let sql = 'SELECT COUNT(*) AS count FROM invite_share WHERE ' +
            'user_to = :id_user';
        conn.query(sql, {
            id_user: id_user
        }, (err, rows) => {
            if (err) {
                cb(err, null);
            } else {
                //console.log('FLECH COUNT: ' + rows);
                //console.log('FLECH COUNT: ' + rows[0]);
                cb(null, rows);
            }
        });
    } else {
        cb('Conexion inexistente', null);
    }

};

db.numRowsNotifShare = (id_user, cb) => {
    if (conn) {
        //let sql = 'SELECT COUNT(*) AS count FROM invite_share WHERE ' +
        //    'user_to = :id_user';
        let sql = 'SELECT COUNT(*) AS count_invite, (SELECT COUNT(*) FROM share WHERE user_to = :id_user)' +
            'AS count_share FROM invite WHERE user_to = :id_user';
        conn.query(sql, {
            id_user: id_user
        }, (err, rows) => {
            if (err) {
                cb(err, null);
            } else {
                //console.log('FLECH COUNT: ' + rows);
                //console.log('FLECH COUNT: ' + rows[0]);
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

db.numRowsEventPromo = (id_user, cb) => {
    if (conn) {
        let sql = 'SELECT COUNT(*) AS count_event, (SELECT COUNT(*) FROM user_promo WHERE id_user = :id_user)' +
            'AS count_promo FROM user_event WHERE id_user = :id_user';
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

//GET

db.getMatches = (data, cb) => {
    /*
    id_flech, user_from, user_to (flech) 
    name, img, age, last_login, status (user) 
    preview, readed (chat_logs) 
    */
    if (conn) {
        let sql = 'SELECT f.id_flech, f.user_from, f.user_to, ' +
            'u.id_user, u.name, u.img, TIMESTAMPDIFF(YEAR,u.date_b,CURDATE()) AS age, u.last_login, u.status, ' +

            '(SELECT body FROM chat_logs WHERE ' +
            '(sender = :id_user && (nickname = f.user_from || nickname = f.user_to) && av_s = 1) OR ' +
            '(nickname = :id_user && (sender = f.user_from || sender = f.user_to) && av_n = 1) ' +
            'ORDER BY chat_logs.created_at DESC LIMIT 1) AS preview,  ' +

            '(SELECT readed FROM chat_logs WHERE ' +
            '(sender = :id_user && (nickname = f.user_from || nickname = f.user_to) && av_s = 1) OR ' +
            '(nickname = :id_user && (sender = f.user_from || sender = f.user_to) && av_n = 1) ' +
            'ORDER BY chat_logs.created_at DESC LIMIT 1) AS readed ' +

            'FROM flech f, user u WHERE ' +
            '(f.user_from = :id_user || f.user_to = :id_user) AND ' + //flech table
            '((f.user_from = u.id_user || f.user_to = u.id_user) AND u.id_user != :id_user) ' + //user table
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

//quedara sin uso
db.getNotif = (data, cb) => {
    if (conn) {
        let sql = 'SELECT iss.id_inv_sha, iss.created_at, iss.sended, iss.readed, iss.id_ref, ' +
            'iss.user_from, iss.user_to, iss.type, u.name AS user_name, u.img, e.name AS ref_name ' +
            'FROM invite_share iss, user u, event e ' +
            'WHERE (iss.user_to = :id_user) AND (iss.user_from = u.id_user) AND (iss.id_ref = e.id_event) ' + //flech table
            //'((f.user_from = u.id_user || f.user_to = u.id_user) AND u.id_user != :id_user) ' + //user table
            'ORDER BY iss.created_at DESC LIMIT :offset, :rows_per_page';

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

db.getInvite = (data, cb) => {
    if (conn) {
        let sql = 'SELECT i.id_invite, i.created_at, i.readed, i.id_event, ' +
            'i.user_from, i.user_to, u.name AS user_name, u.img, e.name AS ref_name ' +
            'FROM invite i, user u, event e ' +
            'WHERE (i.user_to = :id_user) AND (i.user_from = u.id_user) AND (i.id_event = e.id_event) ' + //flech table
            //'((f.user_from = u.id_user || f.user_to = u.id_user) AND u.id_user != :id_user) ' + //user table
            'ORDER BY i.created_at DESC LIMIT :offset, :rows_per_page';

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

db.getShare = (data, cb) => {
    if (conn) {
        let sql = 'SELECT s.id_share, s.created_at, s.readed, s.id_promo, ' +
            's.user_from, s.user_to, u.name AS user_name, u.img, p.name AS ref_name ' +
            'FROM share s, user u, promo p ' +
            'WHERE (s.user_to = :id_user) AND (s.user_from = u.id_user) AND (s.id_promo = p.id_promo) ' + //flech table
            //'((f.user_from = u.id_user || f.user_to = u.id_user) AND u.id_user != :id_user) ' + //user table
            'ORDER BY s.created_at DESC LIMIT :offset, :rows_per_page';

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
        let sql = 'SELECT r.id_record, r.created_at, r.type, r.user_from as id_user, ' +
            'u.name, u.last_name, u.img, TIMESTAMPDIFF(YEAR,u.date_b,CURDATE()) AS age, ' +
            'u.prof, u.ocup, u.location FROM record r, user u WHERE ' +
            '(r.user_to = :id_user) AND (r.user_from = u.id_user) AND (r.used = 0)' +
            'ORDER BY created_at ASC LIMIT :offset, :rows_per_page';
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
            'e.date_b, e.date_e, e.vis, e.inter, (SELECT id_user FROM user_event_inter WHERE id_user = :id_user ' +
            'AND id_event = ue.id_event) AS is_inter ' +
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

db.getPromos = (data, cb) => {
    if (conn) {
        let sql = 'SELECT up.id_promo, p.created_at, p.img, p.name, p.cat,' +
            'p.body ' +
            'FROM user_promo up, promo p WHERE ' +
            '(up.id_user = :id_user) AND (up.id_promo = p.id_promo) ORDER BY created_at ASC LIMIT :offset, :rows_per_page';
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
            'FROM v_user WHERE id_user = :id_user';
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

db.getDataFirstInfo = (id_user, cb) => {
    if (conn) {
        let sql = 'SELECT iam, enjoy, partner ' +
            'FROM user_data WHERE id_user = :id_user';
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
        let sql = 'SELECT id_event, created_at, date_b, date_e, img, name, place, body, ' +
            'location, vis, inter ' +
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
    console.log(data);
    /*los matches que les interesa el evento*/
    if (conn) {
        let sql = 'SELECT uei.id_user, u.name, u.img ' +
            'FROM user u, user_event_inter uei, flech f WHERE ' +
            /*validando que le interese el evento*/
            '(uei.id_event = :id_event) AND ' +
            /*validando el id*/
            '(uei.id_user = u.id_user) AND ' +
            /*validando que sea un match*/
            '((f.user_from = :id_user && f.user_to = uei.id_user) OR ' +
            '(f.user_from = uei.id_user && f.user_to = :id_user)) AND ' +
            /*validando que no se llame a el mismo*/
            '(uei.id_user != :id_user)';

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

        let sql = 'SELECT id_user, name, img, TIMESTAMPDIFF(YEAR,date_b,CURDATE()) AS age, prof, ocup, ' +
            '(6371 * ACOS(SIN(RADIANS(ST_X(location))) * SIN(RADIANS(:lat)) + COS(RADIANS(ST_Y(location) - :lng)) ' +
            '* COS(RADIANS(ST_X(location))) * COS(RADIANS(:lat)))) AS distance ' +
            'FROM user WHERE ' +
            '(id_user != :id_user) AND ' +
            '(TIMESTAMPDIFF(YEAR,date_b,CURDATE()) >= :min_age && TIMESTAMPDIFF(YEAR,date_b,CURDATE()) <= :max_age) AND ' +
            '(sex_pref = :sex && sex = :sex_pref) AND ' +
            'id_user != ALL (SELECT user_to FROM record WHERE user_from = :id_user) AND ' +
            '(ST_X(location) BETWEEN :min_lat AND :max_lat) AND ' +
            '(ST_Y(location) BETWEEN :min_lng AND :max_lng) ' +
            'HAVING distance < :dist ORDER BY distance ASC LIMIT 10';

        conn.query(sql, {
            lat: data.lat,
            lng: data.lng,
            id_user: data.id_user,
            min_age: data.min_age,
            max_age: data.max_age,
            sex: data.sex,
            sex_pref: data.sex_pref,
            min_lat: data.min_lat,
            max_lat: data.max_lat,
            min_lng: data.min_lng,
            max_lng: data.max_lng,
            dist: data.dist

        }, (err, rows) => {
            if (err) {
                cb(err, null);
            } else {
                console.log(rows);
                cb(null, rows);
            }
        });

    } else {
        cb('Conexion inexistente', null);
    }

};

db.getPeople = (data, cb) => {
    console.log(data);
    if (conn) {

        let sql = 'SELECT id_user, name, img, TIMESTAMPDIFF(YEAR,date_b,CURDATE()) AS age, prof, ocup ' +
            'FROM user WHERE ' +
            '(id_user != :id_user) AND ' +
            '(TIMESTAMPDIFF(YEAR,date_b,CURDATE()) >= :min_age && TIMESTAMPDIFF(YEAR,date_b,CURDATE()) <= :max_age) AND ' +
            '(sex_pref = :sex && sex = :sex_pref) AND ' +
            'id_user != ALL (SELECT user_to FROM record WHERE user_from = :id_user) ' +
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

db.getUserImgPrincipal = (id_user, cb) => {
    if (conn) {
        let sql = 'SELECT img FROM user u ' +
            'WHERE id_user = :id_user';
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

db.getUserImgs = (id_user, cb) => {

    if (conn) {
        let sql = 'SELECT id_user_img, path, pos FROM user_img ' +
            'WHERE (id_user = :id_user)';
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

db.getImgUserById = (id_user_img, cb) => {
    if (conn) {
        let sql = 'SELECT id_user_img, path, pos FROM user_img ' +
            'WHERE (id_user_img = :id_user_img)';
        conn.query(sql, {
            id_user_img: id_user_img
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

db.getDataAfterUpdateSettings = (id_user, cb) => {

    if (conn) {
        let sql = 'SELECT min_age, max_age, sex_pref FROM user ' +
            'WHERE id_user = :id_user';
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

db.getDataAfterUpdateEdit = (id_user, cb) => {

    if (conn) {
        let sql = 'SELECT u.prof, u.ocup, ud.iam, ud.enjoy, ud.partner ' +
            'FROM user u, user_data ud WHERE (u.id_user = :id_user) AND (ud.id_user = :id_user)';
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

db.getDataAfterAddMatch = (data, cb) => {

    if (conn) {
        let sql = 'SELECT u.id_user, u.img, u.name, TIMESTAMPDIFF(YEAR,date_b,CURDATE()) AS age ' +
            'FROM user u ' +
            'WHERE id_user = :user_from OR id_user = :user_to ';
        conn.query(sql, {
            user_from: data.user_from,
            user_to: data.user_to
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

db.getUser = (id_user, cb) => {

    if (conn) {
        let sql = 'SELECT u.id_user, u.img, u.name, u.last_name, TIMESTAMPDIFF(YEAR,u.date_b,CURDATE()) AS age, ' +
            'u.prof, u.ocup, ud.iam, ud.enjoy, ud.partner FROM user u, user_data ud ' +
            'WHERE u.id_user = :id_user AND u.id_user = ud.id_user';
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

db.getMatchesParaInviteEvent = (data, cb) => {

    if (conn) {
        let sql = 'SELECT DISTINCT u.id_user, u.img, u.name, TIMESTAMPDIFF(YEAR,u.date_b,CURDATE()) AS age ' +
            'FROM user u, flech f ' +
            'WHERE ((f.user_from = :id_user && f.user_to = u.id_user) OR (f.user_from = u.id_user && f.user_to = :id_user)) ' +
            'AND u.id_user != ALL(SELECT user_to FROM invite WHERE user_from = :id_user AND id_event = :id_event)';
        conn.query(sql, {
            id_user: data.id_user,
            id_event: data.id_event
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




//UPDATE

db.updateLocation = (data, cb) => {

    /*SET @g = ST_GeomFromText('POINT(1 1)');
    INSERT INTO geom VALUES (@g);*/

    /*INSERT INTO geom VALUES (ST_GeomFromText('POINT(1 1)'));
    SET @g = 'POINT(1 1)';
    INSERT INTO geom VALUES (ST_GeomFromText(@g));*/
    console.log(data);
    if (conn) {
        let geo = '(\'POINT(' + data.lat + ' ' + data.lng + ')\')';
        let sql = 'UPDATE user SET location = GeomFromText' + geo + ' WHERE id_user = :id_user';
        conn.query(sql, {
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

db.updateUserStatus = (data, cb) => {
    if (conn) {
        let sql = 'UPDATE user SET status = :status WHERE id_user = :id_user';
        conn.query(sql, {
            status: data.status,
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

db.updateRewind = (data, cb) => {

    if (conn) {
        let sql = 'DELETE from record WHERE user_from = :user_from AND user_to = :user_to';
        conn.query(sql, {
            user_from: data.user_from,
            user_to: data.user_to
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

db.updateSettings = (data, cb) => {

    if (conn) {
        let sql = 'UPDATE user SET min_age = :min_age, max_age = :max_age, sex_pref = :sex_pref ' +
            'WHERE id_user = :id_user';
        conn.query(sql, {
            min_age: data.min_age,
            max_age: data.max_age,
            sex_pref: data.sex_pref,
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

db.updateEdit = (data, cb) => {

    if (conn) {
        let sql = 'UPDATE user u, user_data ud SET u.prof = :prof, u.ocup = :ocup, ' +
            'ud.iam = :iam, ud.enjoy = :enjoy, ud.partner = :partner ' +
            'WHERE (u.id_user = :id_user) AND (ud.id_user = :id_user)';
        conn.query(sql, {
            prof: data.prof,
            ocup: data.ocup,
            iam: data.iam,
            enjoy: data.enjoy,
            partner: data.partner,
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

db.updateInitInfo = (data, cb) => {

    if (conn) {
        let sql = 'UPDATE user_data SET ' +
            'iam = :iam, enjoy = :enjoy, partner = :partner ' +
            'WHERE id_user = :id_user';
        conn.query(sql, {
            iam: data.iam,
            enjoy: data.enjoy,
            partner: data.partner,
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

db.updateLastLogin = (id_user, cb) => {
    if (conn) {
        let sql = 'UPDATE user SET last_login = NOW() ' +
            'WHERE id_user = :id_user';
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

db.updateDeniedSolic = (id_record, cb) => {
    if (conn) {
        let sql = 'UPDATE record SET used = 1 ' +
            'WHERE id_record = :id_record';
        conn.query(sql, {
            id_record: id_record
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

db.updateAcceptedSolic = (id_record, cb) => {
    if (conn) {
        let sql = 'UPDATE record SET used = 2 ' +
            'WHERE id_record = :id_record';
        conn.query(sql, {
            id_record: id_record
        }, (err, rows) => {
            if (err) {
                cb(err, null);
            } else {
                let sql = 'SELECT user_from, user_to FROM record ' +
                    'WHERE id_record = :id_record';
                conn.query(sql, {
                    id_record: id_record
                }, (err, rows) => {
                    if (err) {
                        cb(err, null);
                    } else {
                        console.log('ROWS: ' + rows);
                        cb(null, rows);
                    }
                });
                //cb(null, rows);
            }
        });
    } else {
        cb('Conexion inexistente', null);
    }
};

db.updateImgUserAfterAddNewUser = (data, cb) => {
    if (conn) {
        let sql = 'UPDATE user SET img = :img ' +
            'WHERE id_user = :id_user';
        conn.query(sql, {
            img: data.img,
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

//DELETE

db.deleteImgUser = (data, cb) => {

    if (conn) {
        let sql = 'DELETE FROM user_img WHERE ' +
            'id_user = :id_user AND pos = :pos';
        conn.query(sql, {
            id_user: data.id_user,
            pos: data.pos
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

db.inviteUsers = (data, cb) => {

    let users = data.users;
    let aux = users.split(',');

    console.log(users);
    console.log(aux);

    aux.forEach(id_user => {

        if (conn) {
            let sql = 'INSERT INTO invite (id_event, user_from, user_to) ' +
                'VALUES (:id_event, :user_from, :user_to)';
            conn.query(sql, {
                id_event: data.id_event,
                user_from: data.id_user,
                user_to: id_user
            }, (err, rows) => {
                if (err) {
                    cb(err, null);
                }
            });
        } else {
            cb('Conexion inexistente', null);
        }

    });
    cb(null, false);
};

//CHAT

db.openTalk = (data, cb) => {

    if (conn) {
        let sql = 'SELECT id_chat, created_at, sender, nickname, body, readed FROM chat_logs ' +
            /*Si el mensaje lo envia el usuario actual, se verifica la disponibilidad*/
            'WHERE (sender = :sender && nickname = :nickname && av_s = 1) OR ' +
            /*Si el mensaje ha sido enviado al usuario actual, no se verifica la disponibilidad*/
            '(sender = :nickname && nickname = :sender) LIMIT 40';
        conn.query(sql, {
            sender: data.sender,
            nickname: data.nickname
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

db.upChatScroll = (data, cb) => {

    if (conn) {
        let sql = 'SELECT id_chat, created_at, date, sender, nickname, body, readed FROM chat_logs ' +
            /*Si el mensaje lo envia el usuario actual, se verifica la disponibilidad*/
            'WHERE ((sender = :sender && nickname = :nickname && av_s = 1) OR' +
            /*Si el mensaje ha sido enviado al usuario actual, no se verifica la disponibilidad*/
            '(sender = :nickname && nickname = :sender)) AND (id_chat > :id_chat) LIMIT 40';
        conn.query(sql, {
            sender: data.sender,
            nickname: data.nickname,
            id_chat: data.id_chat
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

db.existsMoreMsgs = (data, cb) => {

    if (conn) {
        let sql = 'SELECT COUNT(*) as count FROM chat_logs ' +
            /*Si el mensaje lo envia el usuario actual, se verifica la disponibilidad*/
            'WHERE ((sender = :sender && nickname = :nickname && av_s = 1) OR' +
            /*Si el mensaje ha sido enviado al usuario actual, no se verifica la disponibilidad*/
            '(sender = :nickname && nickname = :sender)) AND id_chat > :id_chat LIMIT 40';
        conn.query(sql, {
            sender: data.sender,
            nickname: data.nickname,
            id_chat: data.id_chat
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

db.getMsgsWithoutReadForSender = (sender, cb) => {

    if (conn) {
        let sql = 'SELECT COUNT(*) as count FROM chat_logs ' +
            /*Total de mensajes sin leer del usuario para la bottom bar*/
            'WHERE (sender = :sender && av_s = 1 && readed = 0)';
        conn.query(sql, {
            sender: sender
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

db.getMsgsWithoutReadBetweenTwoUsers = (data, cb) => {

    if (conn) {
        let sql = 'SELECT COUNT(*) as count FROM chat_logs ' +
            /*Total de mensajes sin leer del usuario para la bottom bar*/
            'WHERE ((sender = :nickname && nickname = :sender) AND (av_s = 1 && readed = 0))';
        conn.query(sql, {
            sender: data.sender,
            nickname: data.nickname
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

db.removeMsg = (data, cb) => {

    if (conn) {
        let sql = 'UPDATE FROM chat_logs ' +
            /*Deshabilitar msg enviado siempre por sender*/
            'WHERE ' +
            '' +
            /*Si el mensaje ha sido enviado al usuario actual, no se verifica la disponibilidad*/
            '(sender = :nickname && nickname = :sender)) AND id_chat > :id_chat LIMIT 40';
        conn.query(sql, {
            sender: data.sender,
            nickname: data.nickname,
            id_chat: data.id_chat
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

db.removeMsgs = (data, cb) => {

    if (conn) {
        let sql = 'UPDATE FROM chat_logs ' +
            /*Deshabilitar msg enviado siempre por sender*/
            'WHERE ' +
            '' +
            /*Si el mensaje ha sido enviado al usuario actual, no se verifica la disponibilidad*/
            '(sender = :nickname && nickname = :sender)) AND id_chat > :id_chat LIMIT 40';
        conn.query(sql, {
            sender: data.sender,
            nickname: data.nickname,
            id_chat: data.id_chat
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

db.disableAvSender = (id_chat, cb) => {

    if (conn) {
        let sql = 'UPDATE FROM chat_logs SET av_s = 0 ' +
            /*Deshabilitar msg enviado para senderr*/
            'WHERE id_chat = :id_chat';
        conn.query(sql, {
            id_chat: id_chat
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

db.disableAvNickname = (id_chat, cb) => {

    if (conn) {
        let sql = 'UPDATE FROM chat_logs SET av_n = 0 ' +
            /*Deshabilitar msg enviado para senderr*/
            'WHERE id_chat = :id_chat';
        conn.query(sql, {
            id_chat: id_chat
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

db.addNewMsg = (data, cb) => {

    if (conn) {
        let sql = 'INSERT INTO chat_logs (sender, nickname, body) VALUES ' +
            /*Insertando mensaje*/
            '(:sender, :nickname, :body)';
        conn.query(sql, {
            sender: data.sender,
            nickname: data.nickname,
            body: data.body
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

db.getMsgById = (id_chat, cb) => {

    if (conn) {
        let sql = 'SELECT id_chat, created_at, sender, nickname, body FROM chat_logs ' +
            /*Total de mensajes sin leer del usuario para la bottom bar*/
            'WHERE id_chat = :id_chat';
        conn.query(sql, {
            id_chat: id_chat
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