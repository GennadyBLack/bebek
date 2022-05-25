module.exports = function(app) {
    const auth = require('../controller/auth.controller.js');
    const middleware = require('../middleware/chekToken')
    // Auth
    app.post('/api/auth/login', auth.login);
    app.post('/api/auth/register', auth.register);
    app.post('/api/auth/me',middleware.verify, auth.me);
}