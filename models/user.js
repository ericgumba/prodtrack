var mongoose = require('mongoose'); 

var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
    username: {type: String, required: true, max: 100},
    password: {type: String, required: true, max: 100},
    email: {type: String, required: true},
    entries: [{ type: Schema.ObjectId, ref: 'Entry' }]
    }
  );
 
  UserSchema
  .virtual('url')
  .get(function () {
    return '/users/'+this._id;
  });
 

// Export model.
module.exports = mongoose.model('User', UserSchema);