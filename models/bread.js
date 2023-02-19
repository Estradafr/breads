// Require mongoose
const mongoose = require('mongoose');
// Creating shorthand for the Schema constructor
const {Schema} = mongoose;

// Schema
const breadSchema = new Schema({
	name: {type: String, required: true},
	hasGluten: {type: Boolean},
	image: {type: String, default: 'http://placehold.it/500x500.png'},
});

// Model and Exports
const bread_data = mongoose.model('bread_data', breadSchema);
module.exports = bread_data;
