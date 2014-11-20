var config = require('../OathKeeper/frontend/mysql-charon.json');

module.exports.connections = {
    MySQL: {
        adapter: 'sails-mysql',
        host: config.host,
        port: config.port,
        user: config.username,
        password: config.password,
        database: config.database
    }
};
