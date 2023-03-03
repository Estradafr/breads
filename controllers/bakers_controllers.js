// DEPENDENCIES
const express = require('express');
const baker = express.Router();
const Baker = require('../models/baker.js');
const bakerSeedData = require('../models/baker_seed.js');

// GET
baker.get('/data/seed', async (req, res) => {
	await Baker.find().then((foundBakers) => {
		foundBakers.forEach((deletedBaker) => {
			Baker.findByIdAndDelete(deletedBaker._id).then((oldBaker) => {
				console.log(oldBaker);
			});
		});
	});

	let foundBakers = await Baker.find();
	foundBakers.forEach(async (deletedBaker) => {
		await Baker.findByIdAndDelete(deletedBaker.id);
	});

	await Baker.insertMany(bakerSeedData);
	res.redirect('/breads');
});

// INDEX
baker.get('/', (req, res) => {
	Baker.find()
		.populate('breads')
		.then((foundBakers) => {
			res.send(foundBakers);
		});
});

// SHOW:
baker.get('/:id', (req, res) => {
	Baker.findById(req.params.id)
		.populate({
			path: 'breads',
			options: {limit: 6},
		})
		.then((foundBaker) => {
			res.render('bakerShow', {
				baker: foundBaker,
			});
		});
});

// delete
baker.delete('/:id', (req, res) => {
	Baker.findByIdAndDelete(req.params.id).then((deletedBaker) => {
		res.status(303).redirect('/breads');
	});
});

// export
module.exports = baker;
