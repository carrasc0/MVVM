const chF = require('./chatFunction');
module.exports = function (io) {
    // Initialize a new socket.io application, named 'chat'
    //let chat =
    let appSocket = io.of('/app').on('connection', function (socket) {
        //let address = socket.handshake.address;
        //console.log(socket);
        var handshakeData = socket.request;
        console.log('_query:', handshakeData._query);
        console.log('extra:', handshakeData.extra);

        socket.id = handshakeData._query.userID;
        console.log("SOCKET ID : " + socket.id);

        socket.on('func', function (data, fn) {
            chF[data.fn](data.params, socket, fn);
            console.log('funciones' + data);
        });
        //socket.on('user', function (data, fn) {
        //    routes.chatFunction[data.func](data.params, chat, socket, fn);
        //    console.log(data);
        //});

    });

    let chatSocket = io.of('/chat').on('connection', function (socket) {
        //let address = socket.handshake.address;
        //console.log(socket);
        var handshakeData = socket.request;
        console.log('_query:', handshakeData._query);
        console.log('extra:', handshakeData.extra);

        socket.id = handshakeData._query.userID;
        console.log("SOCKET ID : " + socket.id);

        socket.on('func', function (data, fn) {
            console.log('funciones' + data);
            chF[data.fn](data.params, socket, fn);
        });
        socket.on('/newMsg', function (data, fn) {
            chF.addNewMsg(data.params, socket, fn);
        });
        //socket.on('user', function (data, fn) {
        //    routes.chatFunction[data.func](data.params, chat, socket, fn);
        //    console.log(data);
        //});

    });

};