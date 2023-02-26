const express = require('express');
const bread_router = express.Router();
const bread_data = require('../models/bread.js');
const Baker = require('../models/baker.js');
const breadSeedData = require('../models/bread_seed.js');

// NEW
bread_router.get('/new', async (req, res) => {
	try {
		const foundBakers = await Baker.find();
		res.render('new', {
			bakers: foundBakers,
		});
	} catch (err) {
		console.log(err);
		res.status(404).render('404');
	}
});

// BREAD SEED
bread_router.get('/seeder', async (req, res) => {
	try {
		await bread_data.insertMany(breadSeedData);
		res.redirect('/breads');
	} catch (err) {
		console.log(err);
		res.status(404).render('404');
	}
});

// INDEX
bread_router.get('/', async (req, res) => {
	try {
		const foundBakers = await Baker.find().lean();
		const foundBreads = await bread_data.find().limit(6).lean();
		res.render('index', {
			breads: foundBreads,
			bakers: foundBakers,
			title: 'Index Page',
		});
	} catch (err) {
		console.log(err);
		res.status(404).render('404');
	}
});

// EDIT
bread_router.get('/:id/edit', async (req, res) => {
	try {
		let foundBakers = await Baker.find();
		let foundBread_data = await bread_data.findById(req.params.id);

		res.render('edit', {bread: foundBread_data, bakers: foundBakers});
	} catch (err) {
		console.log(err);
		res.status(404).render('404');
	}
});

// CREATE
bread_router.post('/', async (req, res) => {
	try {
		if (!req.body.image) {
			req.body.image = undefined;
		}
		if (req.body.hasGluten === 'on') {
			req.body.hasGluten = true;
		} else {
			req.body.hasGluten = false;
		}
		await bread_data.create(req.body);
		res.redirect('/breads');
	} catch (err) {
		console.log(err);
		res.status(404).render('404');
	}
});

// SHOW
bread_router.get('/:id', async (req, res) => {
	try {
		let foundBread_data = await bread_data
			.findById(req.params.id)
			.populate('baker');
		const bakedBy = await foundBread_data.getBakedby();
		console.log(bakedBy);
		// might have to await res.render
		res.render('show', {
			bread: foundBread_data,
		});
	} catch (err) {
		console.log(err);
		res.status(404).render('404');
	}
});

// UPDATE
bread_router.put('/:id', async (req, res) => {
	try {
		if (req.body.hasGluten === 'on') {
			req.body.hasGluten = true;
		} else {
			req.body.hasGluten = false;
		}

		let updatedBread_data = await bread_data.findByIdAndUpdate(
			req.params.id,
			req.body,
			{new: true}
		);
		console.log(updatedBread_data);
		res.redirect(`/breads/${req.params.id}`);
	} catch (err) {
		console.log(err);
		res.status(404).render('404');
	}
});

// DELETE
bread_router.delete('/:id', async (req, res) => {
	try {
		let deletedBread_data = await bread_data.findByIdAndDelete(req.params.id);
		res.status(303).redirect('/breads');
	} catch (err) {
		console.log(err);
		res.status(404).render('404');
	}
});
module.exports = bread_router;
