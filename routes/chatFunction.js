const fcChat = {};
const db = require('../models/serverDB');

/*funciones para el chat
open Talk
upScroll chat
remove msgs
remove msg
add msg ()
get msgs sin leer del usuario
get msgs sin leer entre dos usuarios

*/

fcChat.openTalk = function (data, socket, next) {

    let params = JSON.stringify(data.params);
    let dataOpen = {
        sender: params.sender,
        nickname: params.nickname
    }
    db.openTalk(dataOpen, (err, data) => {
        if (err) {
            next(err);
        } else {
            let returnData = {
                exists: true,
                msgs: data
            };
            //todo implementar moment
            next(returnData);
        }
    });
};

fcChat.upScrollChat = function (data, socket, next) {

    let params = JSON.stringify(data.params);
    let dataOpen = {
        sender: params.sender,
        nickname: params.nickname,
        id_chat: params.id_chat
    }

    db.upChatScroll(dataOpen, (err, data) => {
        if (err) {
            next(err);
        } else {
            //verifico si hay mensajes
            if (data.lenght > 0) {
                //buscar valor de more
                let dataExists = {
                    sender: params.sender,
                    nickname: params.nickname,
                    id_chat: data[data.lenght - 1].id_chat
                };
                db.existsMoreMsgs(dataExists, (err, data1) => {
                    if (err) {
                        next(err);
                    } else {

                        let returnData = {
                            more: data1.count,
                            exists: true,
                            msgs: data
                        };
                        next(returnData);
                    }
                });

            } else {
                //no hubo mensajes, envio vacio
                let returnData = {
                    more: false,
                    exists: false,
                    msgs: new Array()
                };
                next(returnData);
            }

        }

    });
};

fcChat.removeMsg = function (data, socket, next) {

    let params = JSON.stringify(data.params);
    let id_chat = params.id_chat;
    let sender = params.sender;
    let nickname = params.nickname;



};

fcChat.removeMsgs = function (data, socket, next) {

};

fcChat.addNewMsg = function (data, socket, next) {

    let params = JSON.stringify(data.params);
    let sender = params.sender;
    let nickname = params.nickname;
    let body = params.body;

};

fcChat.getMsgsWithoutReadForUser = function (data, socket, next) {

};

fcChat.getMsgsWithoutReadBetweenTwoUsers = function (data, socket, next) {

};

module.exports = fcChat;