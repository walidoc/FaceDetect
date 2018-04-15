
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
 
exports.register = function(req, res, next){

    const { email, password, name } = req.body;
 
    if(!email){
        return res.status(422).send({error: 'You must enter a email '});
    }
 
    if(!password){
        return res.status(422).send({error: 'You must enter a password'});
    }
 
    let user = {
        email,
        password,
        name
    }

    res.status(200).json(user);

}
 
