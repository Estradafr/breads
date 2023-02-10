const express = require('express');
const bread_router = express.Router();
const bread_data = require('../models/bread.js');

// INDEX
bread_router.get('/', (req, res) => {
	res.send(bread_data);
});

// SHOW
bread_router.get('/:arrayIndex', (req, res) => {
	res.send(bread_data[req.params.arrayIndex]);
});

module.exports = bread_router;
