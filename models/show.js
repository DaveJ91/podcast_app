var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment')

var ShowSchema = new Schema(
    {
        title: {type: String, required:true, max: 100},
        podcast: {type: Schema.Types.ObjectId, ref: 'Podcast', required: true},
        guest: {type: Schema.Types.ObjectId, ref: 'Person', required:false},
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
    .get(function(){
        return '/catalog/shows/' + this._id
        // better to show: this.podcast._id + this.id...
    })

// Virtual for the correct date format for date_published
ShowSchema
    .virtual('date_published_yyyy_mm_dd')
    .get(function(){
        return moment(this.date_published).format('YYYY-MM-DD');
    })

// Virtual - Average Rating - will be linked to User which is not implemented yet

module.exports = mongoose.model('Show', ShowSchema)