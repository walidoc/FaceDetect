const bcrypt = require('bcrypt-nodejs')
const db = require('../../config/database')
 
exports.register = function(req, res, next){
    const { email, password, name } = req.body;
    
    if(!email){
        return res.status(422).send({error: 'You must enter a email '});
    }
    if(!password){
        return res.status(422).send({error: 'You must enter a password'});
    }

    const hash = bcrypt.hashSync(password);
    
    db('users')
        .returning('*')
        .insert({
            email: email,
            name: name,
            joined: new Date()
        })
        .then(user => {
            res.status(200).json(user[0]);
        })
        .catch( err => res.status(400).json("Unable to register"))
}
 
exports.signin = (req, res, next) => {
    const { email, password } = req.body;

    if( email == 'walid@gmail.com' && password == 'walid') {
        let user = {
            email: email,
            name: 'walid',
            entries: 5
        }
        res.status(200).json(user);
    }
}

exports.profile = (req, res, next) => {
    const { id } = req.params;

    db.select('*').from('users')
    .where({ id })
    .then(user => {
        if(user.length){
            res.status(200).json(user[0])
        } else {
            res.status(400).json("User not found")
        }
    })    
}