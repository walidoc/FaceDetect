const db = require('../../config/database');

exports.increment = (req, res, next) => {

    const { id } = req.params;

    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => res.json(entries[0]))
        .catch(err => res.status(400).json('Unable to get entries'))
}
 