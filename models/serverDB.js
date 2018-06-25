"use strict";

let conn = require('./config');
let DB = {};

DB.getUsers = (cb) => {
    if (conn) {
        let sql = 'SELECT * FROM user';
        conn.query(sql, (err, rows) => {
            if (err) {
                throw err;
            } else {
                cb(null, rows);
            }
        });
    }

};

module.exports = DB;