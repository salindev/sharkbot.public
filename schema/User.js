const mongoose = require('mongoose')

let schema = mongoose.Schema({
	userID: String,

	balance: Number,
	bank: Number,

	fracid: Number,

	bonusTimeout: Date,

	rabstvoTimeout: Date,
	payRabs: Date,
	rab: {type: Boolean, default: false},
	code: String,
	rabs: Array,
	
})
module.exports = mongoose.model("User", schema) 