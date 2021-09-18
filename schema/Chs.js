const mongoose = require('mongoose')

let schema = mongoose.Schema({
	userID: String,
    chs: Boolean
})
module.exports = mongoose.model("Chs", schema) // компилю