var mongoose = require('mongoose');
var passwordHash = require('password-hash');

var Schema = mongoose.Schema;

var userSchema = new Schema({ 
    email: String, 
    password: String, 
    confirm : Boolean
})

userSchema.pre('save', function(next) {
    const user = this;
    user.password = passwordHash.generate(user.password);
    next();
});

module.exports = mongoose.model('User', userSchema );