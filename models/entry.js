var Task = require('./task')

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EntrySchema = new Schema({
    title: {type: String, required: true, unique: true },
    tasks: [Task.schema],  
});

// Virtual for this genre instance URL.
EntrySchema
.virtual('url')
.get(function () {
  return '/catalog/genre/'+this._id;
});

// Export model.
module.exports = mongoose.model('Entry', EntrySchema);
