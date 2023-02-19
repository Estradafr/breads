const express = require('express');
const bread_router = express.Router();
const bread_data = require('../models/bread.js');

// INDEX
bread_router.get('/', (req, res) => {
	bread_data.find().then((foundBread_data) => {
		res.render('index', {
			breads: foundBread_data,
			title: 'Index Page',
		});
	});
});

// NEW
bread_router.get('/new', (req, res) => {
	res.render('new');
});

// EDIT
bread_router.get('/:id/edit', (req, res) => {
	res.render('edit', {
		bread: bread_data[req.params.id],
		index: req.params.id,
	});
});

// SHOW
bread_router.get('/:id', (req, res) => {
	bread_data
		.findById(req.params.id)
		.then((foundBread_data) => {
			res.render('show', {
				bread: foundBread_data,
			});
		})
		.catch((err) => {
			res.send('404');
		});
});

// CREATE
bread_router.post('/', (req, res) => {
	if (!req.body.image) {
		req.body.image = undefined;
	}
	if (req.body.hasGluten === 'on') {
		req.body.hasGluten = true;
	} else {
		req.body.hasGluten = false;
	}
	bread_data.create(req.body);
	res.redirect('/breads');
});

// DELETE
bread_router.delete('/:indexArray', (req, res) => {
	bread_data.splice(req.params.indexArray, 1);
	res.status(303).redirect('/breads');
});

// UPDATE
bread_router.put('/:arrayIndex', (req, res) => {
	if (req.body.hasGluten === 'on') {
		req.body.hasGluten = true;
	} else {
		req.body.hasGluten = false;
	}
	bread_data[req.params.arrayIndex] = req.body;
	res.redirect(`/breads/${req.params.arrayIndex}`);
});

module.exports = bread_router;
