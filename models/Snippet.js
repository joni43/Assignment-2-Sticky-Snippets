'user strict'

const mongoose = require('mongoose')

// create user Schema & model
var SnippetSchema = new mongoose.Schema({
  text: {type: String, required: true},
  createdAt: {type: Date, default: Date.now},
  createdBy: {type: String, required: true}
})

// Creating the model - just like an object
let Snippet = mongoose.model('Snippet', SnippetSchema)

module.exports = Snippet

// module.exports.createSnippets = function (newSnippet, callback) {
//   newSnippet.save(callback)
// }
