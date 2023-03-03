const express = require('express');

// DEPENDENCIES
const methodOverride = require('method-override');

// CONFIGURATION
require('dotenv').config();
const app = express();
const PORT = process.env.PORT;
const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

// MIDDLEWARE
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

// MONGOOSE
mongoose.set({strictQuery: true});
app.use(methodOverride('_method'));
mongoose.connect(
	MONGO_URI,
	{useNewUrlParser: true, useUnifiedTopology: true},
	() => {
		console.log('Connected to MONGO');
	}
);

// ROUTES
app.get('/', (req, res) => {
	res.send('<h1>Welcome to BreadCRUD!</h1> <p>An App about bread..</p>');
});

// BREAD DATA
const breadsController = require('./controllers/breads_controller.js');
app.use('/breads', breadsController);

// BAKERS DATA
const bakersController = require('./controllers/bakers_controllers.js');
app.use('/bakers', bakersController);

// 404 Page
app.get('*', (req, res) => {
	res.send('404');
});

// LISTEN
app.listen(PORT, () => {
	console.log('Listening on port:', PORT);
});
