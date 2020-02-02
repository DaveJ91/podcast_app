var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PodcastSchema = new Schema(
    {
        name: {type: String, required: true, max: 100},
        host: {type: Schema.Types.ObjectId, ref: 'Person'},
        started: {type: Date},
        youtube_link: {type: String},
        soundcloud_link: {type: String},
        genre: {type: String, required:true},
        // logo: {data: Buffer, contentType: String} // Not Implemented yet

    }
)


// Virtual for the Podcast URL
PodcastSchema
    .virtual('url')
    .get('url')
    .get(function(){
        return '/podcast/' + this._id
    });

// Export Model
module.exports = mongoose.model('Podcast', PodcastSchema)

