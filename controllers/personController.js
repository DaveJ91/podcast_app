var Podcast = require('../models/podcast')
var Show = require('../models/show')
var Person = require('../models/person')


const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var async = require('async');

// List View
exports.person_list = function(req, res, next){

    Person.find()
        .sort([['last_name', 'ascending']])
        .exec(function(err, list_persons) {
            
            if (err) {return next(err)}
            else {
                res.render('person_list', { title: 'People List', person_list: list_persons});
            }
        });
};

// Person Detail View
exports.person_detail = function(req, res, next) {
    
}

// Create View - GET
exports.person_create_get = function(req, res, next){
        res.render('person_form', {title: 'Create a Person'})
}

// Create View - POST
exports.person_create_post = [
    
    // Validate Fields
    body('firstName').isLength({min:1}).trim(),
    body('lastName').isLength({min:1}).trim(),
    body('expertise').isLength({min:1}).trim(),
    body('website').isLength({min:1}).trim(),
    body('description').isLength({min:1}).trim(),

    // Sanitize Fields
    sanitizeBody('firstName').escape(),
    sanitizeBody('lastName').escape(),
    sanitizeBody('expertise').escape(),
    sanitizeBody('website').escape(),
    sanitizeBody('description').escape(),

    // Process request after validation and sanitization
    (req, res, next) => {

        // extract validation errors from a request
    
        const errors = validationResult(req);

        // Create Person object with escaped and trimmed data
        var person = new Person(
            {
                first_name: req.body.firstName,
                last_name: req.body.lastName,
                expertise: req.body.expertise,
                website: req.body.website,
                description: req.body.description,
                podcast: req.body.podcast
            }
        );

        if (!errors.isEmpty()) {
            console.log(errors)

            // if errors re-render the form - need to do this
        }
        else {
            person.save(function(err){
             
                if (err) {return next(err); }
                res.redirect('/catalog/people');
            });
        }
    }
    
]