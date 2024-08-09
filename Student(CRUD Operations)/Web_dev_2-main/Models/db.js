const { default: mongoose } = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://127.0.0.1:27017/db_test');

mongoose.connection
    .once('open', () => console.log('Connected To the database!'))
    .on('error', err => console.log('Error with the database!', err));