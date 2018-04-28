const Clarifai = require('clarifai');

const db = require('../../config/database');
const clarifaiApi = require('../../config/apiKey');

// instantiate clarifai with my API key
const app = new Clarifai.App({ 
    apiKey: clarifaiApi.key 
});


exports.clarifaiCall = (req, res) => {
    const { input } = req.body;

    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, input)
        .then(response => res.json(response))
        .catch(err => res.status(400).json('Unable to work with API'))
}


exports.increment = (req, res) => {

    const { id } = req.body;

    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => res.json(entries[0]))
        .catch(err => res.status(400).json('Unable to get entries'))
}
 