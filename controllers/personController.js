var Podcast = require('../models/podcast')
var Show = require('../models/show')
var Person = require('../models/person')

// TO DO: Add validators and sanitizers

var async = require('async');

// List View
exports.person_list = function(req, res, next){

    Person.find()
        .sort([['last_name', 'ascending']])
        .exec(function(err, list_persons) {
            console.log(list_persons)
            
            if (err) {return next(err)}
            else {
                res.render('person_list', { title: 'People List', person_list: list_persons});
            }
        });
};

