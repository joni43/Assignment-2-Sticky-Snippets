const mongoose = require('mongoose')

var usersSchema = new Schema({
    username: {
    user:  String,
    unique: true
},
password: {
    type: String,
    required: true
}
)}

let user = mongoose.model('user', usersSchema)