var mongoose = require('mongoose'); 
var Entry = require('./entry');
var Schema = mongoose.Schema;
 

var UserSchema = new Schema(
    {
    username: {type: String, required: true, max: 100, unique: true},
    email: {type: String, max:100, unique: true},
    password: {type: String, required: true, max: 100}, 
    entries: [ {type: Object, unique: false} ]
    }
  );
 
  UserSchema
  .virtual('url')
  .get(function () {
    return '/users/'+this._id;
  });
 

// Export model.
module.exports = mongoose.model('User', UserSchema);