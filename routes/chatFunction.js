const fcChat = {};
const db = require('../models/serverDB');
const utils = require('../utils/utils');

fcChat.getMessages = function (req, res, next) {

    //console.log(params);
    let dataOpen = {
        sender: req.body.sender,
        nickname: req.body.nickname
    };
    db.getMessages(dataOpen, (err, data) => {
        if (err) {
            next(err);
        } else {
            //console.log(data);
            if (data.length !== 0) {
                console.log('existe');
                data.forEach(msg => {
                    msg.date = utils.formatDateMsgChat(msg.created_at);
                    msg.created_at = utils.formatTimeMsgChat(msg.created_at);
                });
                console.log(data);
                res.json({
                    success: true,
                    message: "Existen registros",
                    messages: data
                });
            } else {
                console.log('no existe');
                res.json({
                    success: false,
                    message: "Existen registros"
                });
            }
        }
    });
};

fcChat.getMoreMessages = function (req, res, next) {

    let dataOpen = {
        sender: req.body.sender,
        nickname: req.body.nickname,
        id_chat: req.body.id_chat
    };
    db.getMoreMessages(dataOpen, (err, data) => {
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
                db.existMoreMessages(dataExists, (err, data1) => {
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

fcChat.newMessage = function (data, socket, next) {

    //let params = JSON.stringify(data.params);
    let sender = data.sender;
    let nickname = data.nickname;
    let body = data.body;

    let dataMsg = {
        sender,
        nickname,
        body
    };

    db.newMessage(dataMsg, (err, data) => {
        if (err) {
            next(err);
        } else {
            db.getMessageById(data.insertId, (err, data) => {
                if (err) {
                    next(err);
                } else {
                    console.log(data);
                    //next(data);
                    socket.to(nickname).emit("recNewMsg", data);
                    socket.to(sender).emit("addNewMsg", data);
                }
            });
        }
    });
};

fcChat.getMessagesWithoutReadForSender = function (data, socket, next) {

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

fcChat.getMessagesWithoutReadBetweenTwoUsers = function (data, socket, next) {

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