const mongoose = require('mongoose');

//mongoose.set('debug', true);
const options = {
    useMongoClient: true
}
mongoose.connect(process.env.DB_URL, options, err => {
    if (err) {
    console.error('Oops, could not connect to the DB!\n' + err);
    }
})
mongoose.Promise = global.Promise;

module.exports.Todo = require('./todo');