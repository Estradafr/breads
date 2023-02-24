const mongoose = require('mongoose');
const {Schema} = mongoose;

const bakerSchema = new Schema({
	name: {
		type: String,
		enum: [
			'Spiderman',
			'Iron-Man',
			'Captain America',
			'Thor',
			'Hulk',
			'Black Panther',
		],
		required: true,
	},
	startDate: {
		type: Date,
		required: true,
	},
	bio: String,
});

const Baker = mongoose.model('Baker', bakerSchema);
module.exports = Baker;
