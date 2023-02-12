const express = require('express');

// CONFIGURATION
require('dotenv').config();
const app = express();
const PORT = process.env.PORT;

// MIDDLEWARE
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

// ROUTES
app.get('/', (req, res) => {
	res.send('<h1>Welcome to BreadCRUD!</h1> <p>An App about bread..</p>');
});

// BREAD DATA
const breadsController = require('./controllers/breads_controller.js');
app.use('/breads', breadsController);

// 404 Page
app.get('*', (req, res) => {
	res.send('404');
});

// LISTEN
app.listen(PORT, () => {
	console.log('Listening on port:', PORT);
});
