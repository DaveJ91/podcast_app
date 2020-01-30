var Podcast = require('../models/podcast')
var Show = require('../models/show')
var Person = require('../models/person')
var Topic = require('../models/topic')
var Genre = require('../models/genre')

// TO DO: Add validators and sanitizers - for the Forms

var async = require('async');

// List View
exports.topic_list = function(req, res, next){

    Topic.find()
        .sort([['name', 'ascending']])
        .exec(function(err, list_topics) {
            if (err) {return next(err)}
            else {
                res.render('topic_list', { title: 'Topic List', topic_list: list_topics});
            }
        });
};

