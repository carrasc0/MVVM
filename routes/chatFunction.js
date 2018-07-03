const fcChat = {};
const db = require('../models/serverDB');
const utils = require('../utils/utils');

/*funciones para el chat
open Talk (DONE)
upScroll chat (DONE)
remove msgs (DONE)
remove msg (DONE)
add msg (DONE)
get msgs sin leer del usuario (DONE)
get msgs sin leer entre dos usuarios (DONE)

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

    let listMsgs = JSON.stringify(data.msgs);

    listMsgs.forEach(msg => {

        if (utils.isSender(msg.sender, msg.id_user)) {
            db.disableAvSender(msg.id_chat, (err, data) => {
                if (err) {
                    next(err);
                } else {
                    console.log('result of disable AV Sender: ' + data);
                }
            });
        } else {
            db.disableAvNickname(msg.id_chat, (err, data) => {
                if (err) {
                    next(err);
                } else {
                    console.log('result of disable AV Sender: ' + data);
                }
            });
        }

    });
    let returnData = {
        error: false
    }
    next(returnData);
};

fcChat.removeConversation = function (data, socket, next) {

    let sender = data.params.sender;
    let nickname = data.params.nickname;
    let id_user = data.params.id_user;

       

    

};

fcChat.addNewMsg = function (data, socket, next) {

    let params = JSON.stringify(data.params);
    let sender = params.sender;
    let nickname = params.nickname;
    let body = params.body;

    let dataMsg = {
        sender,
        nickname,
        body
    };

    db.addNewMsg(dataMsg, (err, data) => {
        if (err) {
            next(err);
        } else {
            let dataReturn = {
                id_chat: data.insertId,
                body: body
            };
            next(dataReturn);
        }
    });

};

fcChat.getMsgsWithoutReadForSender = function (data, socket, next) {

    let params = JSON.stringify(data.params);
    let sender = params.sender;

    db.getMsgsWithoutReadForSender(sender, (err, data) => {
        if (err) {
            next(err);
        } else {
            let returnData = {
                count: data[0].count
            };
            next(returnData);
        }
    });
};

fcChat.getMsgsWithoutReadBetweenTwoUsers = function (data, socket, next) {

    let params = JSON.stringify(data.params);
    let sender = params.sender;
    let nickname = params.nickname;

    let dataBetween = {
        sender,
        nickname
    };
    db.getMsgsWithoutReadBetweenTwoUsers(dataBetween, (err, data) => {
        if (err) {
            next(err);
        } else {
            let returnData = {
                count: data[0].count
            };
            next(returnData);
        }
    });
};

module.exports = fcChat;