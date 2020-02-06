var express = require('express');
var router = express.Router();

// Import controllers

var podcast_controller = require('../controllers/podcastController');
var show_controller = require('../controllers/showController');
var person_controller = require('../controllers/personController'); 




/////////////////////////////////////////////
/////// PODCAST ROUTES //////////////////////
/////////////////////////////////////////////

// PODCAST - List View
router.get('/podcasts', podcast_controller.podcast_list);

// PODCAST - Detail View
// router.get('/podcasts/:id', podcast_controller.podcast_detail);

// PODCAST - Create View
router.get('/podcasts/create', podcast_controller.podcast_create_get);
router.post('/podcasts/create', podcast_controller.podcast_create_post);

// PODCAST - Update View
// router.get('/podcasts/:id/update', podcast_controller.podcast_update_get);
// router.post('/podcasts/:id/update', podcast_controller.podcast_update_post);

// PODCAST - Delete View
// router.get('/podcasts/:id/delete', podcast_controller.podcast_delete_get);
// router.post('/podcasts/:id/delete', podcast_controller.podcast_delete_post);

////////////////////////////////////////////
//// SHOW ROUTES //////////////////////////
///////////////////////////////////////////

// SHOW - List View
router.get('/shows', show_controller.show_list);



// SHOW - Create View
router.get('/shows/create', show_controller.show_create_get);
router.post('/shows/create', show_controller.show_create_post);

// SHOW - Update View
router.get('/shows/:id/update', show_controller.show_update_get);
// router.post('/shows/:id/update', show_controller.show_update_post);

// SHOW - Delete View
// router.get('/shows/:id/delete', show_controller.show_delete_get);
// router.post('/shows/:id/delete', show_controller.show_delete_post);

// SHOW - Detail View
router.get('/shows/:id', show_controller.show_detail);


//////////////////////////////////////////
///////// PERSON ROUTES  /////////////////
//////////////////////////////////////////

// PEOPLE - List View
router.get('/people', person_controller.person_list);



// PEOPLE - Create View
router.get('/people/create', person_controller.person_create_get);
router.post('/people/create', person_controller.person_create_post);

// PEOPLE - Update View
router.get('/people/:id/update', person_controller.person_update_get);
router.post('/people/:id/update', person_controller.person_update_post);

// PEOPLE - Delete View
// router.get('/people/:id/delete', person_controller.person_delete_get);
// router.post('/people/:id/delete', person_controller.person_delete_post);

// PEOPLE - Detail View
router.get('/people/:id', person_controller.person_detail);

module.exports = router;