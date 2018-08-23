const fcChat = {};
const db = require('../models/serverDB');
const utils = require('../utils/utils');

/*
 *funciones para el chat
 *open Talk (DONE)
 *upScroll chat (DONE)
 *remove msgs (DONE)
 *remove msg (DONE)
 *add msg (DONE)
 *get msgs sin leer del usuario (DONE)
 *get msgs sin leer entre dos usuarios (DONE)
 */

fcChat.openTalk = function (req, res, next) {

    //console.log('open talk:' + data + socket);
    //let params = JSON.stringify(data.params);
    //console.log(JSON.stringify(data));
    //console.log(data.params);
    //console.log(params);
    let dataOpen = {
        sender: req.body.sender,
        nickname: req.body.nickname
    };
    db.openTalk(dataOpen, (err, data) => {
        if (err) {
            next(err);
        } else {
            //let datos1 = JSON.stringify(data);
            //let datos = JSON.parse(datos1);
            //console.log(datos);
            //console.log(datos.length);
            //console.log(Number(datos.lenght));
            //console.log(parseInt(datos.lenght));
            //console.log(data.lenght);
            //console.log(parseInt(data.lenght));
            //console.log(data);
            if (data.length !== 0) {
                console.log('existe');
                data.forEach(msg => {
                    msg.date = utils.formatDateMsgChat(msg.created_at);
                    msg.created_at = utils.formatTimeMsgChat(msg.created_at);
                });
                console.log(data);
                res.json({
                    exists: true,
                    msgs: data
                });
            } else {
                console.log('no existe');
                res.json({
                    exists: false,
                    msgs: []
                });
            }
        }
    });
};

fcChat.openTalkOld = function (data, socket, next) {

    console.log('open talk:' + data + socket);
    //let params = JSON.stringify(data.params);
    //console.log(JSON.stringify(data));
    //console.log(data.params);
    //console.log(params);
    let dataOpen = {
        sender: data.sender,
        nickname: data.nickname
    };
    db.openTalk(dataOpen, (err, data) => {
        if (err) {
            next(err);
        } else {
            data.forEach(msg => {
                msg.created_at = utils.formatDateMsgChat(msg.created_at);
            });
            let returnData = {
                exists: true,
                msgs: data
            };
            //todo implementar moment
            console.log(returnData);
            next(returnData);
        }
    });
};

fcChat.upScrollChat = function (req, res, next) {

    let dataOpen = {
        sender: req.body.sender,
        nickname: req.body.nickname,
        id_chat: req.body.id_chat
    };
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
                        data.forEach(msg => {
                            msg.created_at = utils.formatMsgChat(msg.created_at);
                        });
                        res.json({
                            more: data1[0].count > 0,
                            exists: true,
                            msgs: data
                        });
                    }
                });
            } else {
                res.json({
                    more: false,
                    exists: false,
                    msgs: []
                });
            }
        }
    });
};

fcChat.upScrollChatOld = function (data, socket, next) {

    let params = JSON.stringify(data.params);
    let dataOpen = {
        sender: params.sender,
        nickname: params.nickname,
        id_chat: params.id_chat
    };

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
                        data.forEach(msg => {
                            msg.created_at = utils.formatMsgChat(msg.created_at);
                        });
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
    };
    next(returnData);
};

fcChat.removeConversation = function (data, socket, next) {

    let sender = data.params.sender;
    let nickname = data.params.nickname;
    let id_user = data.params.id_user;

    //primero seleccionar todos los mensajes
    let dataConv = {
        sender,
        nickname
    };
    db.getConversationForDelete(dataConv, (err, data) => {
        if (err) {
            next(err);
        } else {
            if (data.lenght > 0) {
                //si hay msgs los proceso uno por uno
                data.forEach(msg => {

                    if (utils.isSender(msg.sender, id_user)) {
                        //es sender
                        db.disableAvSender(msg.id_chat, (err, data) => {
                            if (err) {
                                next(err);
                            } else {
                                console.log('result of disable AV Sender: ' + data);
                            }
                        });
                    } else {
                        //es nickname
                        db.disableAvNickname(msg.id_chat, (err, data) => {
                            if (err) {
                                next(err);
                            } else {
                                console.log('result of disable AV Nickname: ' + data);
                            }
                        });
                    }

                });
                //termino el foreach
                let dataReturn = {
                    error: false
                };
                next(dataReturn);

            } else {
                let dataReturn = {
                    error: false
                };
                next(dataReturn);
            }
        }

    });

};

fcChat.addNewMsg = function (data, socket, next) {

    //let params = JSON.stringify(data.params);
    let sender = data.sender;
    let nickname = data.nickname;
    let body = data.body;

    let dataMsg = {
        sender,
        nickname,
        body
    };

    db.addNewMsg(dataMsg, (err, data) => {
        if (err) {
            next(err);
        } else {
            db.getMsgById(data.insertId, (err, data) => {
                if (err) {
                    next(err);
                } else {
                    console.log(data);
                    next(data);
                }
            });
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