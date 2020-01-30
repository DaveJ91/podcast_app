var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PodcastSchema = new Schema(
    {
        name: {type: String, required: true, max: 100},
        host: {type: Schema.Types.ObjectId, ref: 'Host', required: true},
        started: {type: Date},
        youtube: {type: String},
        soundcloud: {type: String},
        genre: {type: Schema.Types.ObjectId, ref: 'Genre', required: true},
        // logo: {data: Buffer, contentType: String} // Not Implemented yet

    }
)


// Virtual for the Podcast URL
PodcastSchema
    .virtual('url')
    .get('url')
    .get(function(){
        return '/podcast' + this._id
    });

// Export Model
module.exports = mongoose.model('Podcast', PodcastSchema)

