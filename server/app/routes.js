const AuthenticationController = require('./controllers/authentication'), 
    express = require('express');


module.exports = function(app){
 
    const apiRoutes = express.Router(),
        authRoutes = express.Router();
 
    // Auth Routes
    apiRoutes.use('/auth', authRoutes);
 
    authRoutes.post('/register', AuthenticationController.register);
    authRoutes.post('/login', AuthenticationController.login);
 
    // Set up routes
    app.use('/api', apiRoutes);
 
}