var express = require('express');
var router = express.Router();


// Require our controllers.
var movie_controller = require('../controllers/movieController'); 
var director_controller = require('../controllers/directorController');
var actor_controller = require('../controllers/actorController');

/// MOVIE ROUTES ///

// GET admin home page.
router.get('/moviehome', movie_controller.movie_home_get);  

router.get('/actorhome',movie_controller.actor_home_get);

router.get('/directorhome',movie_controller.director_home_get);



// GET request for creating a Movie. NOTE This must come before routes that display Movie (uses id).
router.get('/movie/create', movie_controller.movie_create_get);

// POST request for creating Movie.
router.post('/movie/create', movie_controller.movie_create_post);

// GET request for one Movie.
router.get('/movie/:id', movie_controller.movie_detail);

// GET request for list of all Movie.
router.get('/movie', movie_controller.movie_list);

// GET request to update Movie.
router.get('/movie/:id/update', movie_controller.movie_update_get);

// POST request to update Movie.
router.post('/movie/:id/update', movie_controller.movie_update_post);

// GET request to delete Movie.
router.get('/movie/:id/delete', movie_controller.movie_delete_get);

// POST request to delete Movie.
router.post('/movie/:id/delete', movie_controller.movie_delete_post);

// Director ROUTES /// 

// GET request for creating a Director. NOTE This must come before routes that display Director (uses id).
router.get('/director/create', director_controller.director_create_get);

// POST request for creating director.
router.post('/director/create', director_controller.director_create_post);

// GET request for one director.
router.get('/director/:id', director_controller.director_detail);

// GET request for list of all director.
router.get('/director', director_controller.director_list);

// GET request to update director.
router.get('/director/:id/update', director_controller.director_update_get);

// POST request to update director.
router.post('/director/:id/update', director_controller.director_update_post);

// GET request to delete director.
router.get('/director/:id/delete', director_controller.director_delete_get);

// POST request to delete director.
router.post('/director/:id/delete', director_controller.director_delete_post);



/// Actor ROUTES /// 

// GET request for creating a Director. NOTE This must come before routes that display Director (uses id).
router.get('/actor/create', actor_controller.actor_create_get);

// POST request for creating director.
router.post('/actor/create', actor_controller.actor_create_post);

// GET request for one director.
router.get('/actor/:id', actor_controller.actor_detail);

// GET request for list of all director.
router.get('/actor', actor_controller.actor_list);

// GET request to update director.
router.get('/actor/:id/update', actor_controller.actor_update_get);

// POST request to update director.
router.post('/actor/:id/update', actor_controller.actor_update_post);

// GET request to delete director.
router.get('/actor/:id/delete', actor_controller.actor_delete_get);

// POST request to delete director.
router.post('/actor/:id/delete', actor_controller.actor_delete_post);

module.exports = router;