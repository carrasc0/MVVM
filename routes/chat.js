module.exports = function (controllers, io) {
    // Initialize a new socket.io application, named 'chat'
    let chat = io.on('connection', function (socket) {
        let address = socket.handshake.address;
        console.log("New connection from " + address);

        //socket.emit("conectt")
        /*
         * es el router del chat, por aca pasan todas las acciones del mismo
         * las cuales van a para en el controller users.js
         * funciona de la siguiente manera
         * data es un json con los parametros de la funode chat.jsnode ncion a ejecutar
         y fn es una funcion de retorno o anonima como se les conoce
         * la misma debe estar definida en user.js
         * ejemplo socket.emit('user',{func:'OLogin',params:{username:'oniel'}},console.log);
         * el resultado de la llamada a esa funcion seria imprimir en la consola de nodejs
         * los datos de ese usuario que se logueo
         * otro ejemplo socket.emit('user',{func:'OLogin',params:{username:'oniel'}},function(data){
         * console.log(data);
         *});
         * el resultado es el mismo que el anterior, imprimir los datos del usuario
         */
        socket.on('user', function (data, fn) {
            controllers.users[data.func](data.params, chat, socket, fn);
            console.log(data);
        });
        /*
         * Solo maneja el evento para cuando un usuario esta escribiendo un sms
         * notificarle al otro usuario que fulano is typing
         */
        socket.on("typing", function (data) {
            if (typeof data !== "undefined" && typeof data.sender !== "undefined")
                io.in(data.username).emit("isTyping", {
                    isTyping: data.typing,
                    sender: data.sender,
                    username: data.username
                });
        });
    });

};