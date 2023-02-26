const express = require('express');
const bread_router = express.Router();
const bread_data = require('../models/bread.js');
const Baker = require('../models/baker.js');
const breadSeedData = require('../models/bread_seed.js');

// NEW
bread_router.get('/new', (req, res) => {
	Baker.find().then((foundBakers) => {
		res.render('new', {
			bakers: foundBakers,
		});
	});
});

// BREAD SEED
bread_router.get('/seeder', (req, res) => {
	bread_data.insertMany(breadSeedData).then(res.redirect('/breads'));
});

// INDEX
bread_router.get('/', async (req, res) => {
	const foundBakers = await Baker.find().lean();
	const foundBreads = await bread_data.find().limit(6).lean();
	res.render('index', {
		breads: foundBreads,
		bakers: foundBakers,
		title: 'Index Page',
	});
});

// EDIT
bread_router.get('/:id/edit', (req, res) => {
	Baker.find().then((foundBakers) => {
		bread_data.findById(req.params.id).then((foundBread_data) => {
			res.render('edit', {bread: foundBread_data, bakers: foundBakers});
		});
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

// SHOW
bread_router.get('/:id', (req, res) => {
	bread_data
		.findById(req.params.id)
		.populate('baker')
		.then((foundBread_data) => {
			const bakedBy = foundBread_data.getBakedby();
			console.log(bakedBy);
			res.render('show', {
				bread: foundBread_data,
			});
		})
		.catch((err) => {
			res.send('404');
		});
});

// UPDATE
bread_router.put('/:id', (req, res) => {
	if (req.body.hasGluten === 'on') {
		req.body.hasGluten = true;
	} else {
		req.body.hasGluten = false;
	}
	bread_data
		.findByIdAndUpdate(req.params.id, req.body, {new: true})
		.then((updatedBread_data) => {
			console.log(updatedBread_data);
			res.redirect(`/breads/${req.params.id}`);
		});
});

// DELETE
bread_router.delete('/:id', (req, res) => {
	bread_data.findByIdAndDelete(req.params.id).then((deletedBread_data) => {
		res.status(303).redirect('/breads');
	});
});

module.exports = bread_router;
