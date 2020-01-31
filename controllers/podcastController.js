var Podcast = require('../models/podcast')
var Show = require('../models/show')
var Person = require('../models/person')
var Topic = require('../models/topic')
var Genre = require('../models/genre')

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// TO DO: Add validators and sanitizers

var async = require('async');

// List View
exports.podcast_list = function(req, res, next){

    Podcast.find()
        .sort([['name', 'ascending']])
        .populate('host')
        .exec(function(err, list_podcasts) {
            if (err) {return next(err)}
            else {
                res.render('podcast_list', { title: 'Podcast List', podcast_list: list_podcasts});
            }
        });
};

// Create View - GET
exports.podcast_create_get = function(req, res, next){

    // Get host, guest, genres - async function
    async.parallel({
        host: function(callback){
            Person.find(callback);
        },
        genres: function(callback){
            Genre.find(callback);
        },
    }, function(err, results) {
        if (err) {return next(err); }
        res.render('podcast_form', {title: 'Create Podcast', host: results.host, genres:results.genres });
    });
};

// Create View - POST
exports.podcast_create_post = [


    // Convert the Genre to an Array
    (req, res, next) => {
        if(!(req.body.genre instanceof Array)){
            if(typeof req.body.genre==='undefined')
            req.body.genre=[];
            else
            req.body.genre=new Array(req.body.genre);
        }
        next();
    },

    //Validate the Fields
    body('name', 'Name must not be empty.').isLength({min:1}).trim(),
    // body('host', 'Host must not be empty.').isLength({min:1}).trim(),
    

    //Sanitize the fields
    sanitizeBody('*').escape(),
    
    // After validation and sanitization process request
    (req, res, next) => {

        // Extract the validation errors from the request
        const errors = validationResult(req);

        // Create a Podcast Object with escaped and trimmed data
        var podcast = new Podcast(
            {
                name: req.body.name,
                // host: req.body.host,
                // genre: req.body.genre,
                youtube_link: req.body.youtube,
                soundcloud_link: req.body.soundcloud

             }
        );

        if (!errors.isEmpty()) {
            console.log(errors)
            // if there's errors rerender the form

            async.parallel({
                hosts: function(callback){
                    Person.find(callback);
                },
                genres: function(callback){
                    Genre.find(callback)
                },
            }, function(err, results) {
                if (err) {return next(err); }
                
            });
            return;
        }

        else {
            // If the form data is valid, save the Podcast
            podcast.save(function(err) {
                console.log("save podcast")
                if(err) {return next(err); }
                res.redirect('/catalog')
            })
        }
    }
]

