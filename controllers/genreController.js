var Podcast = require('../models/podcast')
var Show = require('../models/show')
var Person = require('../models/person')
var Topic = require('../models/topic')
var Genre = require('../models/genre')

// TO DO: Add validators and sanitizers - for the Forms

var async = require('async');

// List View
exports.genre_list = function(req, res, next){

    Genre.find()
        .sort([['name', 'ascending']])
        .exec(function(err, list_genres) {
            if (err) {return next(err)}
            else {
                res.render('genre_list', { title: 'Genre List', genre_list: list_genres});
            }
        });
};

