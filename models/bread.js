// Require mongoose
const mongoose = require('mongoose');
// Creating shorthand for the Schema constructor
const {Schema} = mongoose;

// Schema
const breadSchema = new Schema({
	name: {type: String, required: true},
	hasGluten: {type: Boolean},
	image: {type: String, default: 'https://via.placeholder.com/500'},
	baker: {
		type: Schema.Types.ObjectId,
		ref: 'Baker',
	},
});

// Helper Methods
breadSchema.methods.getBakedby = function () {
	return `This ${this.name} Bread was baked with love by ${
		this.baker.name
	}, who has been with us since ${this.baker.startDate.getFullYear()}`;
};

// Model and Exports
const bread_data = mongoose.model('bread_data', breadSchema);
module.exports = bread_data;
