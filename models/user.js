const mongoose = require('mongoose')

// create user Schema & model
var usersSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}
})
usersSchema.path('password').validate(function (password) {
    return password.length >= 6
}, 'password must be at least 6 characters')

let User = mongoose.model('user', usersSchema)

module.exports = User
