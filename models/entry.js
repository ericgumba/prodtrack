  
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EntrySchema = new Schema({
    title: {type: String, required: true },
    tasks: [{ type: Schema.ObjectId, ref: 'Task' }],
    minutesComplete: { type: Number, required: false },
    hoursComplete: { type: Number, required: true },
    pomodorosComplete: { type: Number, required: false },

});

// Virtual for this genre instance URL.
EntrySchema
.virtual('url')
.get(function () {
  return '/catalog/genre/'+this._id;
});

// Export model.
module.exports = mongoose.model('Entry', EntrySchema);
