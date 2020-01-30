var express = require('express');
var router = express.Router();

// Require Controllers - NOT IMPLEMENTED YET


// PODCAST ROUTES

// PODCAST - List View
router.get('/podcasts', podcast_controller.podcast_list);

// SHOW ROUTES

// SHOW - List View
router.get('/shows', show_controller.show_list);

// SHOW - Detail View
router.get('/shows/:id', show_controller.show_detail);

// SHOW - Create View
router.get('/shows/create', show_controller.show_create_get);
router.post('/shows/create', show_controller.show_create_post);

// SHOW - Update View
router.get('/shows/:id/update', show_controller.show_update_get);
router.post('/shows/:id/update', show_controller.show_update_post);

// SHOW - Delete View
router.get('/shows/:id/delete', show_controller.show_delete_get);
router.post('/shows/:id/delete', show_controller.show_delete_post);



// PERSON ROUTES
router.get('/people', person_controller.person_list);

// TOPIC ROUTES
router.get('/topics', topic_controller.topic_list);

// GENRE ROUTES
router.get('/genres', genre_controller.genre_list);

module.exports = router;