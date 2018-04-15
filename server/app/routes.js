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
    
    // Image Routes
    apiRoutes.use('/image', imageRoutes);

    imageRoutes.put(ImageController.increment)

    // Set up routes
    app.use('/api', apiRoutes);
 
}