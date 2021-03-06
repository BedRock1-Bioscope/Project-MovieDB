var Movie = require('../models/movie');
var Actor = require('../models/actor');
var Director = require('../models/director');
var async = require('async');

exports.index = function(err, results) {
        res.render('index', { title: 'Local Library Home', error: err, data: results });
};

// Display movie create form on GET.
exports.movie_create_get = function(req, res) {
        res.render('movie_form', { title: 'Create Movie'});
};

// Display detail page for a specific movie.
exports.movie_detail = function(req, res, next) {
 
  async.parallel({
      movie: function(callback) {

          Movie.findById(req.params.id)
            .exec(callback);
      }
  }, function(err, results) {
      if (err) { return next(err); }
      if (results.movie==null) { // No results.
          var err = new Error('Book not found');
          err.status = 404;
          return next(err);
      }
      // Successful, so render.
      res.render('movie_detail', { title: 'Title', movie:  results.movie } );
  });

};

// Handle book create on POST.
exports.movie_create_post = function(req, res) {
    var movie = new Movie(
        {
          mov_id: req.body.mov_id,
          mov_name:req.body.mov_name,  
          mov_dir: req.body.mov_dir,
          mov_actor: req.body.mov_actor,
          mov_cast: req.body.mov_cast,
          mov_reldate: req.body.mov_reldate,
          mov_genre: req.body.mov_genre,
          mov_plot: req.body.mov_plot,
          mov_critics: req.body.mov_critics,
          mov_thumb: req.body.mov_thumb
          //awards: String,
          //poster: String,
          //rating: Number
        }
      );
    movie.save()
        .then(item => {
            res.send("Movie saved to database");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
};

// Display list of all movies.
exports.movie_list = function(req, res, next) {

  Movie.find({}, 'mov_name mov_dir')
    //.populate('mov_dir')
    .exec(function (err, list_movies) {
      if (err) {return next(err)} 
      else {
            // Successful, so render
            res.render('movie_list', { title: 'Movie List', movie_list:  list_movies});
        }
    });

};

// Display movie update form on GET.
exports.movie_update_get = function(req, res, next) {

  // Get movie for form.
  async.parallel({
      movie: function(callback) {
          Movie.findById(req.params.id).exec(callback);
      },
      }, function(err, results) {
          if (err) { return next(err); }
          if (results.movie==null) { // No results.
              var err = new Error('Movie not found');
              err.status = 404;
              return next(err);
          }
          // Success.
          res.render('movie_form', { title: 'Update Movie', book: results.book });
      });

};

// Handle movie create on POST.
/*exports.movie_create_post = [
  (req, res, next) => {


      // Create a Movie object with escaped and trimmed data.
      var movie = new Movie(
        {
          mov_id: req.body.mov_id,
          mov_name:req.body.mov_name,  
          mov_dir: req.body.mov_dir,
          mov_actor: req.body.mov_actor,
          mov_cast: req.body.mov_cast,
          mov_reldate: req.body.mov_reldate,
          mov_genre: req.body.mov_genre,
          mov_plot: req.body.mov_plot,
          mov_critics: req.body.mov_critics,
          mov_thumb: req.body.mov_thumb
          //awards: String,
          //poster: String,
          //rating: Number
        }
      );

          // Data from form is valid. Save movie.
          movie.save(function (err) {
              if (err) { return next(err); }
                 // Successful - redirect to new movie record.
                 res.send("done");
                 //res.redirect(movie.url);
              });
      }
];*/



// Handle movie update on POST.
exports.movie_update_post = [

  // Process request after validation and sanitization.
  (req, res, next) => {

            // Create a Movie object with escaped and trimmed data.
            var movie = new Movie(
              {
                mov_id: req.body.mov_id,
                mov_name:req.body.mov_name,  
                mov_dir: req.body.mov_dir,
                mov_actor: req.body.mov_actor,
                mov_cast: req.body.mov_cast,
                mov_reldate: req.body.mov_reldate,
                mov_genre: req.body.mov_genre,
                mov_plot: req.body.mov_plot,
                mov_critics: req.body.mov_critics,
                mov_thumb: req.body.mov_thumb,
                //awards: String,
                //poster: String,
                //rating: Number
                _id:req.params.id
              }
            );

     /* if (!errors.isEmpty()) {
          // There are errors. Render form again with sanitized values/error messages.
          async.parallel(function(err, results) {
              if (err) { return next(err); }
              res.render('movie_form', { title: 'Update Movie', movie: movie});
          });
          return;
      }
      else {*/
          // Data from form is valid. Update the record.
          Movie.findByIdAndUpdate(req.params.id, movie, {}, function (err,themovie) {
              if (err) { return next(err); }
                 // Successful - redirect to movie detail page.
                 res.redirect(themovie.url);
              });
     // }
  }
];

// Display book delete form on GET.
exports.movie_delete_get = function(req, res, next) {

  async.parallel({
      movie: function(callback) {
          Movie.findById(req.params.id).exec(callback);
      },
  }, function(err, results) {
      if (err) { return next(err); }
      if (results.movie==null) { // No results.
          res.redirect('/admin/movie');
      }
      // Successful, so render.
      res.render('movie_delete', { title: 'Delete Movie', movie: results.movie } );
  });

};

// Handle movie delete on POST.
exports.movie_delete_post = function(req, res, next) {

  // Assume the post has valid id (ie no validation/sanitization).

  async.parallel({
      movie: function(callback) {
          Movie.findById(req.body.id).exec(callback);
      },
  }, function(err, results) {
      if (err) { return next(err); }
      // Success
          // Delete object and redirect to the list of movies.
          Movie.findByIdAndRemove(req.body.id, function deleteMovie(err) {
              if (err) { return next(err); }
              // Success - got to movies list.
              res.redirect('/admin/movie');
          });
  });

};