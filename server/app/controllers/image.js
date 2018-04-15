exports.increment = (req, res, next) => {

    const { id } = req.body;

    let user = {
        email: 'walid@gmail.com',
        name: 'walid',
        id: id,
        entries: 5
    }

    res.status(200).json(user);
    
}
 