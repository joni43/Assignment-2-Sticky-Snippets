const mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs');

// create user Schema & model
var usersSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  mail: {type: String},
  password: {type: String, required: true}
})
usersSchema.path('password').validate(function (password) {
    return password.length >= 6
}, 'password must be at least 6 characters')

let User = mongoose.model('user', usersSchema)
module.exports = User

module.exports.createUser = function(newUser, callback){
bcrypt.genSalt(10, function(err, salt) {
  if (err) return err;
  bcrypt.hash(newUser.password, salt, null, function(err, hash) {
    newUser.password = hash;
    newUser.save(callback);
  });
});
}
