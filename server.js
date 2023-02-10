const express = require('express');

// CONFIGURATION
require('dotenv').config();
const app = express();
const PORT = process.env.PORT;

// ROUTES
app.get('/', (req, res) => {
	res.send('Welcome to my Bread App!');
});

// BREAD DATA
const breadsController = require('./controllers/breads_controller.js');
app.use('/breads', breadsController);

// LISTEN
app.listen(PORT, () => {
	console.log('Listening on port:', PORT);
});
