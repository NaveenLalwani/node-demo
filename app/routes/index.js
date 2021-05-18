const user = require('./user');
const admin = require('./admin');
const purchase = require('./purchase');

module.exports = function(app){
    app.use('/api/user', user );
    app.use('/api/admin', admin );
}