var Podcast = require('../models/podcast')
var Show = require('../models/show')
var Person = require('../models/person')
var Topic = require('../models/topic')
var Genre = require('../models/genre')

// TO DO: Add validators and sanitizers - for the Forms

var async = require('async');

// Home Page
exports.home = function(req, res){

    async.parallel({
        Podcast_count: function(callback){
            Podcast.count(callback);
        },
        Show_count: function(callback){
            Show.count(callback);
        }
    }, function(err, results){
        res.render('home', {title: 'Podcast App Home', error:err, data:results });
    });
}
