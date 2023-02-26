const mongoose = require('mongoose');
const bread_data = require('./bread.js');
const {Schema} = mongoose;

const bakerSchema = new Schema(
	{
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
	},
	{toJSON: {virtuals: true}}
);

bakerSchema.virtual('breads', {
	ref: 'bread_data',
	localField: '_id',
	foreignField: 'baker',
});

// POST HOOK
bakerSchema.post('findOneAndDelete', function () {
	bread_data.deleteMany({baker: this._conditions._id}).then((deleteStatus) => {
		console.log(deleteStatus);
	});
});

const Baker = mongoose.model('Baker', bakerSchema);
module.exports = Baker;
