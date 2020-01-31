var Podcast = require('../models/podcast')
var Show = require('../models/show')
var Person = require('../models/person')
var Topic = require('../models/topic')
var Genre = require('../models/genre')

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
exports.podcast_create_post = function(req, res, next){
    console.log(req)
}

