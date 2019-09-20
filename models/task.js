  
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TaskSchema = new Schema({
    name: {type: String, required: true }, 
    minutesComplete: { type: Number, required: true },

});

// Virtual for this genre instance URL.
TaskSchema
.virtual('url')
.get(function () {
  return '/catalog/genre/'+this._id;
});

// Export model.
module.exports = mongoose.model('Task', TaskSchema); 