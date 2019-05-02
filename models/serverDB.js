"use strict";
let conn = require('./config');
let db = {};

//CHAT

db.openTalk = (data, cb) => {

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

db.getMsgById = (id_chat, cb) => {

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