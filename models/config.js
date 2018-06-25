const dbConnectionConfig = {
    host: '127.0.0.1',
    user: 'admin',
    password: 'admin',
    database: 'db_flech',
    port: '3306'
};
let mysql = require('mysql');
let connection = mysql.createConnection(dbConnectionConfig);

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected to MySQL Server as id ' + connection.threadId);
});
connection.config.queryFormat = function (query, values) {
    if (!values) return query;
    return query.replace(/\:(\w+)/g, function (txt, key) {
        if (values.hasOwnProperty(key)) {
            return this.escape(values[key]);
        }
        return txt;
    }.bind(this));
};
module.exports = connection;