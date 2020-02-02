var Podcast = require('../models/podcast')
var Show = require('../models/show')
var Person = require('../models/person')


// TO DO: Add validators and sanitizers

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

