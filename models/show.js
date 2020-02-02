var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ShowSchema = new Schema(
    {
        title: {type: String, required:true, max: 100},
        podcast: {type: Schema.Types.ObjectId, ref: 'Podcast', required: true},
        guest: [{type: Schema.Types.ObjectId, ref: 'Person', required:false}],
        host: {type: Schema.Types.ObjectId, ref: 'Person', required:true},
        topic: {type: String, required:false, max: 600},
        date_published: {type: Date, default: Date.now },
        length_mins: {type: Number, min: 1, max: 600},
        summary: {type: String, required:false, max: 1000},
        show_notes: {type: String, required:false, max: 10000}
        
    }
)

// Virtual for the Show URL
ShowSchema
    .virtual('url')
    .get('url')
    .get(function(){
        return '/show/' + this.id
        // better to show: this.podcast._id + this.id...
    })


// Virtual - Average Rating - will be linked to User which is not implemented yet

module.exports = mongoose.model('Show', ShowSchema)