"use strict";
let conn = require('./config');
let db = {};

//CHAT

db.getMessages = (data, cb) => {

    if (conn) {
        let sql = 'SELECT id, created_at, sender, nickname, body FROM chat_logs ' +
            /*Si el mensaje lo envia el usuario actual, se verifica la disponibilidad*/
            'WHERE (sender = :sender && nickname = :nickname) OR ' +
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

db.getMoreMessages = (data, cb) => {

    if (conn) {
        let sql = 'SELECT id, created_at, readed, date, sender, nickname, body  FROM chat_logs ' +
            /*Si el mensaje lo envia el usuario actual, se verifica la disponibilidad*/
            'WHERE ((sender = :sender && nickname = :nickname) OR' +
            /*Si el mensaje ha sido enviado al usuario actual, no se verifica la disponibilidad*/
            '(sender = :nickname && nickname = :sender)) AND (id > :id_chat) LIMIT 40';
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

db.existMoreMessages = (data, cb) => {

    if (conn) {
        let sql = 'SELECT COUNT(*) as count FROM chat_logs ' +
            /*Si el mensaje lo envia el usuario actual, se verifica la disponibilidad*/
            'WHERE ((sender = :sender && nickname = :nickname) OR' +
            /*Si el mensaje ha sido enviado al usuario actual, no se verifica la disponibilidad*/
            '(sender = :nickname && nickname = :sender)) AND id > :id_chat LIMIT 40';
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

db.getMessagesWithoutReadForSender = (sender, cb) => {

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

db.getMessagesWithoutReadBetweenTwoUsers = (data, cb) => {

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

db.newMessage = (data, cb) => {
    if (conn) {
        console.log("new msg");
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

db.getMessageById = (id_chat, cb) => {

    if (conn) {
        let sql = 'SELECT id, created_at, sender, nickname, body FROM chat_logs ' +
            /*Total de mensajes sin leer del usuario para la bottom bar*/
            'WHERE id = :id_chat';
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