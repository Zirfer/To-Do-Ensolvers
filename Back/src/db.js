const mongoose = require('mongoose');

const URI = process.env.DB_URI ? process.env.DB_URI : 'mongodb://localhost/ToDoItems'

mongoose.connect(URI, {
    useNewUrlParser: true
})

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('DB connected');
})