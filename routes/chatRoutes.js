const chF = require('./chatFunction');
module.exports = function (io) {
    // Initialize a new socket.io application, named 'chat'
    let chat = io.on('connection', function (socket) {
        let address = socket.handshake.address;
        console.log("New connection from " + address);
        console.log("New connection from " + socket);

        socket.on('func', function (data, fn) {
            chF[data.fn](data.params, socket, fn);
            console.log('funciones' + data);
        });
        //socket.on('user', function (data, fn) {
        //    routes.chatFunction[data.func](data.params, chat, socket, fn);
        //    console.log(data);
        //});

    });

};