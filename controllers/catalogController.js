var Podcast = require('../models/podcast')
var Show = require('../models/show')
var Person = require('../models/person')


// TO DO: Add validators and sanitizers - for the Forms

var async = require('async');

// Home Page
exports.home = function(req, res, next){

    console.log("requested home page")
    res.render('home', { title: 'Home'});
        
    };

    // async.parallel({
    //     Podcast_count: function(callback){
    //         Podcast.count(callback);
    //     },
    //     Show_count: function(callback){
    //         Show.count(callback);
    //     },
    // }, function(err, results){
    //     res.render('home', {title: 'Podcast App Home', error:err, data:results });
    // });

