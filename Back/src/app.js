const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');

// Settings
app.set('port', process.env.PORT || 4000)

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/items', require('./routes/items'));
app.use('/api/folders', require('./routes/folders'));


module.exports = app;