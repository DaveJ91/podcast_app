var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TopicSchema = new Schema({
    name: {type: String, required: true, min: 3, max: 100}
});

// Virtual for this Topic instance URL.
TopicSchema
.virtual('url')
.get(function () {
  return '/topic/'+this._id;
});

// Export model.
module.exports = mongoose.model('Topic', TopicSchema);
