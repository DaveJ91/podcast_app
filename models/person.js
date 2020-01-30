var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PersonSchema = new Schema(
    {
        first_name: {type: String, required:true, max: 100},
        last_name: {type: String, required:true, max: 100},
        expertise: {type: String, required: true}, // should be array
        website: {type: String, required:false},
        description: {type: String, required: false}
        // book - NOT IMPLEMENTED,
        // picture - NOT IMPLEMENTED

    }
)

// Virtual for Person URL
PersonSchema
    .virtual('url')
    .get('url')
    .get(function(){
        return '/person/' + this.id
    })

// Virtual for Appearances on other shows

module.exports = mongoose.model('Person', PersonSchema)

