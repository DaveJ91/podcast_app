var Podcast = require('../models/podcast')
var Show = require('../models/show')
var Person = require('../models/person')
var Topic = require('../models/topic')
var Genre = require('../models/genre')

// TO DO: Add validators and sanitizers

var async = require('async');

// List View
exports.person_list = function(req, res, next){

    Person.find()
        .sort([['name', 'ascending']])
        .exec(function(err, list_persons) {
            if (err) {return next(err)}
            else {
                res.render('people_list', { title: 'People List', person_list: list_persons});
            }
        });
};

