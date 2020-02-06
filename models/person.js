var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PersonSchema = new Schema(
    {
        first_name: {type: String, required:true, max: 100},
        last_name: {type: String, required:true, max: 100},
        expertise: {type: String, required: true}, // should be array
        website: {type: String, required:false},
        description: {type: String, required: false},
        podcast: {type: String, required: true},
    }
)

// Virtual for Person URL
PersonSchema
    .virtual('url')
    .get(function(){
        return this.id
    })

// Virtual for Full Name
PersonSchema
    .virtual('full_name')
    .get(function(){
        return `${this.first_name} ${this.last_name}`
    })


 
// Virtual for Appearances on other shows

module.exports = mongoose.model('Person', PersonSchema)

