let mongoose = require('mongoose');
let bcrypt = require('bcrypt');

let UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  passwordConf: {
    type: String,
    required: true
  }
});

UserSchema.statics.authenticate = (email, password, callback) => {
  User
  .findOne({email: email})
  .exec((err, user) => {
    if(err) return callback(err);
    else if(!user){
      let err = new Error('User not found.');
      err.status = 401;
      return callback(err);
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if(result === true){
        return callback(null, user);
      } else {
        return callback();
      }
    })
  })
}

UserSchema.pre('save', (next) => {
  let user = this;
  bcrypt.hash(user.password, 10, (err, hash) => {
    if(err) return next(err);
    user.password = hash;
    next();
  })
});

let User = mongoose.model('User', UserSchema);
module.exports = User;