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

