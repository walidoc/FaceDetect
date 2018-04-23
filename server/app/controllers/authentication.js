const bcrypt = require('bcrypt-nodejs')

const db = require('../../config/database')


exports.register = (req, res, next) => {
    const { email, password, name } = req.body;
    
    if(!email){
        return res.status(422).send({error: 'You must enter a email '});
    }
    if(!password){
        return res.status(422).send({error: 'You must enter a password'});
    }

    const hash = bcrypt.hashSync(password);
    
    db.transaction(trx => {
        trx.insert({
            password: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
                    .returning('*')
                    .insert({
                        email: email,
                        name: name,
                        joined: new Date()
                    })
                    .then(user => {
                        res.status(200).json(user[0]);
                    })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('Unable to register'))
        
}
 
exports.signin = (req, res, next) => {
    const { email, password } = req.body;

    db.select('email', 'password')
        .from('login')
        .where('email', '=', email)
        .then(credentials => {
            const isValid = bcrypt.compareSync(password, credentials[0].password);
            if(isValid){
                return db.select('*').from('users')
                .where('email', '=', email)
                .then(user => {
                    res.json(user[])
                })
                .catch(err => res.status(400).json('Unable to find user'))
            } else {
                res.status(400).json('wrong credentials')
            }
        })
        .catch(err => res.status(400).json('wrong credentials'))
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