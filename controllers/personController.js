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

    async.parallel({
        person: function(callback) {
            Person.findById(req.params.id)
                .exec(callback)
        },

        // Get the podcasts the person hosts
        // Get podcast appeanances
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.person ==null){
            var err = new Error('Person not Found');
            err.status = 404;
            return next(err);
        }
        console.log(results.person)
        res.render('person_detail', {title: 'Person Detail', person:results.person })
    })

}

// Create View - GET
exports.person_create_get = function(req, res, next){
        res.render('person_form', {title: 'Create a Person', person:{}})

}

// Create View - POST
exports.person_create_post = [
    
    // Validate Fields
    body('firstName').isLength({min:1}).trim(),
    body('lastName').isLength({min:1}).trim().withMessage('must not be empty'),
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
        console.log(errors)

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


            // if errpors re-render the form - with sanitization and validation messages
            res.render('person_form', {title: 'Person Form', person:person, errors: errors.array()});
            console.log("error -person details")
            console.log(person)
            return;
        }
        else {
            person.save(function(err){
             
                if (err) {return next(err); }
                res.redirect('/catalog/people');
            });
        }
    }
    
]


// Update Person - GET
exports.person_update_get =function(req, res, next){

    async.parallel({
        person: function(callback) {
            Person.findById(req.params.id)
                .exec(callback)
        },
        // Get the podcasts the person hosts
        // Get podcast appeanances
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.person ==null){
            var err = new Error('Person not Found');
            err.status = 404;
            return next(err);
        }
        console.log(results.person)
        res.render('person_form', {title: 'Update Person', person:results.person })
    })
}

// Update Person - POST
exports.person_update_post = [
    // Validate Fields
    body('firstName').isLength({min:1}).trim(),
    body('lastName').isLength({min:1}).trim().withMessage('must not be empty'),
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
        console.log(errors)

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


            // if errpors re-render the form - with sanitization and validation messages
            res.render('person_form', {title: 'Person Form', person:person, errors: errors.array()});
            console.log("error -person details")
            console.log(person)
            return;
        }
        else {
            person.save(function(err){
            
                if (err) {return next(err); }
                res.redirect('/catalog/people');
            });
        }
    }

]

// Delete View - GET







