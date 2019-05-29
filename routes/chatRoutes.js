const chatFunction = require('./chatFunction');
module.exports = function (io) {

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
            chatFunction[data.fn](data.params, socket, fn);
        });

        socket.on('typing', function (data, fn){
            console.log('data entry: ' + data)
            let dataTyping = {
               sender: data.sender,
               nickname: data.nickname,
               typing: data.typing
            };
            console.log('before emit typing', dataTyping)
            socket.emit('typing', dataTyping)
        });
    });
};