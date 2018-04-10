
exports.login = function(req, res, next){
 
    res.status(200).send('login is working!')
 
}
 
exports.register = function(req, res, next){

    const { username, password } = req.body;

 
    if(!username){
        return res.status(422).send({error: 'You must enter a username address'});
    }
 
    if(!password){
        return res.status(422).send({error: 'You must enter a password'});
    }
 
    res.status(200).send('signup is working!');
 
 
}
 
