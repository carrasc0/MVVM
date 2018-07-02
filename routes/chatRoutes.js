const chF = require('./chatFunction');
module.exports = function (io) {
    // Initialize a new socket.io application, named 'chat'
    let chat = io.on('connection', function (socket) {
        let address = socket.handshake.address;
        console.log("New connection from " + address);

        socket.on("openTalk", chF.openTalk);

        socket.on("upScrollChat", chF.upScrollChat);

        socket.on("removeMsg", chF.removeMsg);

        socket.on("removeMsgs", chF.removeMsgs);

        socket.on("addNewMsg", chF.addNewMsg);

        socket.on("getMsgsWithoutReadForSender", chF.getMsgsWithoutReadForSender);

        socket.on("getMsgsWithoutReadBetweenTwoUsers", chF.getMsgsWithoutReadBetweenTwoUsers);

        //socket.on('user', function (data, fn) {
        //    routes.chatFunction[data.func](data.params, chat, socket, fn);
        //    console.log(data);
        //});

    });

};