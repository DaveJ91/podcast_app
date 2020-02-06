var Podcast = require('../models/podcast')
var Show = require('../models/show')
var Person = require('../models/person')


const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var async = require('async');

// List View
exports.show_list = function(req, res, next){

    Show.find()
        .populate('podcast')
        .populate('guest')
        .populate('host').exec(function(err, list_shows) {
            if (err) {return next(err)}
            else {
                res.render('show_list', { title: 'Show List', show_list: list_shows});
            }
        });
};

// Detail View
exports.show_detail = function(req, res, next){
    
    async.parallel({
        show: function(callback) {
            Show.findById(req.params.id)
                .exec(callback)
        },
    }, function(err, results){
        if (err) { return next(err); }
        if (results.show ==null){
            var err = new Error('Show not found');
            err.status = 404;
            return next(err);
        }
        res.render('show_detail', {title: 'Show Detail', show:results.show })

    })
}

// Create View - GET
exports.show_create_get = function(req, res, next){

    // Get all Podcasts and Guests
    async.parallel({
        people: function(callback){
            Person.find(callback);
        },
        podcasts: function(callback){
            Podcast.find(callback)
        },
    }, function(err, results) {
        if (err) {return next(err); }
        console.log(results.people)
        console.log(results.podcasts)
        res.render('show_form', {title: 'Create a Show', people: results.people, podcasts: results.podcasts, show:{}})
    });   
}

// Create View - POST
exports.show_create_post = [
    
    // Validate Fields
    body('title').isLength({min:1}).trim(),
    body('podcast').isLength({min:1}).trim(),
    body('guest').isLength({min:1}).trim(),
    body('host').isLength({min:1}).trim(),
    body('topic').isLength({min:1}).trim(),
    // need to do more

    //Sanitize Fields
    sanitizeBody('title').escape(),
    sanitizeBody('podcast').escape(),
    sanitizeBody('guest').escape(),
   
    sanitizeBody('topic').escape(),

    // Process request after validation and sanitization
    (req, res, next) => {
        // extract errors from the request
        const errors = validationResult(req);

        // create SHOW object with escaped and trimmed data
        var show = new Show(
            {
                title: req.body.title,
                podcast: req.body.podcast,
                guest: req.body.guest,
                host: req.body.host,
                topic: req.body.topic,
                date_published: req.body.date_published,
                length_mins: req.body.length,
                summary: req.body.summary,
                show_notes: req.body.show_notes
            }
        );

        if (!errors.isEmpty()){
            console.log(errors)

            // Get the podcasts and people for the form
            async.parallel({
                people: function(callback){
                    Person.find(callback);
                },
                podcasts: function(callback){
                    Podcast.find(callback)
                },
            }, function(err, results) {
                if (err) {return next(err); }
                res.render('show_form', {title: 'Create a Show',errors:errors,people: results.people, podcasts: results.podcasts, show:{}})
            })
        }
        else {
            // Data is valid - Save the new show object
            show.save(function(err){
                if (err) {return next(err); }
                    // Successful - redirect to list view
                    res.redirect('/catalog/shows')
            });
        }      
    }
]