const AuthenticationController = require('./controllers/authentication'), 
      ImageController = require('./controllers/image'), 
      express = require('express');


module.exports = function(app){
 
    const apiRoutes = express.Router(),
          authRoutes = express.Router(),
          imageRoutes = express.Router();
 
    // Auth Routes
    apiRoutes.use('/auth', authRoutes);
 
    authRoutes.post('/register', AuthenticationController.register);
    authRoutes.post('/signin', AuthenticationController.signin);
    authRoutes.get('/profile/:id', AuthenticationController.profile);

    // Image Routes
    apiRoutes.use('/image', imageRoutes);

    imageRoutes.post('/:id', ImageController.increment)

    // Set up routes
    app.use('/api', apiRoutes);
 
}