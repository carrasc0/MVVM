const chF = require('./chatFunction');
module.exports = function (io) {

 let chatSocket = io.of('/chat').on('connection', function (socket) {
        //let address = socket.handshake.address;
        //console.log(socket);
        var handshakeData = socket.request;
        console.log('_query:', handshakeData._query);
        console.log('extra:', handshakeData.extra);

        socket.id = handshakeData._query.userID;Hey
        console.log("SOCKET ID : " + socket.id);

        socket.on('func', function (data, fn) {
            console.log('funciones' + data);
            chF[data.fn](data.params, socket, fn);
        });
    });
};