var Director = require('../models/director');

var async = require ('async');

// Display director create form on GET.
exports.director_create_get = function(req, res) {
        res.render('director_form', { title: 'Create director'});
};

// Display detail page for a specific director.
exports.director_detail = function(req, res, next) {
 
    async.parallel({
        director: function(callback) {
  
            Director.findById(req.params.id)
              .exec(callback);
        }
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.director==null) { // No results.
            var err = new Error('director not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('director_detail', { title: 'Title', director:  results.director } );
    });
  
  };
    

/*Handle director create on POST.
exports.director_create_post = function(req, res) {
    var director = new Director(
        {
            dir_name: req.body.dir_name,
            dir_id: req.body.dir_id,
            dir_dob: req.body.dir_dob,
            dir_tmark: req.body.dir_tmark,
            dir_nat: req.body.dir_nat,
            dir_awards: req.body.dir_awards,
            dir_thumb: req.body.dir_thumb
        }
      );
    director.save()
        .then(item => {
            res.render("director_form");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
};
*/




// Handle book create on POST.
//exports.movie_create_post = function(req, res) {
  exports.director_create_post = [
  (req, res, next) => {
        
    var director = new Director(
        {
            dir_name: req.body.dir_name,
            dir_id: req.body.dir_id,
            dir_dob: req.body.dir_dob,
            dir_tmark: req.body.dir_tmark,
            dir_nat: req.body.dir_nat,
            dir_awards: req.body.dir_awards,
            dir_thumb: req.body.dir_thumb
          //awards: String,
          //poster: String,
          //rating: Number
        }
      );


      
   /* movie.save()
        .then(item => {
         //  res.send("Movie saved to database"); 
           res.render('movie_form');
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });*/
        

  // Data from form is valid. Save book.
  
      director.save(function (err) {
      if (err) { 
        //return next(err); 
        /*return res.status(500).send({
          success: false,
          message: 'movie already exist!'
         
        });*/
        res.render('director_form', { title: 'Director already Exists!'});
      } else{
        res.render('director_form', { title: 'DIRECTOR SAVED'});
      }
         /*   res.send("Movie saved to database"); */
           
        });
}
  
  ];
 
// Display list of all director.
exports.director_list = function(req, res, next) {
  
    if(req.query.search) {
      const regex = new RegExp(escapeRegex(req.query.search), 'gi');
      Director.find({dir_name:regex}, 'dir_name dir_thumb dir_tmark')
      //.populate('mov_dir')
      .exec(function (err, list_directors) {
        if (err) {return next(err)} 
        else if(list_directors== ''){
              // Successful, so render
              res.render('director_list', { title: 'No Director Found Please Add Director!', director_list:  list_directors});
          }
          else{
            res.render('director_list', { title: 'DIRECTOR FOUND!', director_list:  list_directors});
          }
      });
    } else {
      //eval(require('locus'));
      Director.find({}, 'dir_name dir_thumb dir_tmark')
      //.populate('mov_dir')
      .exec(function (err, list_directors) {
        if (err) {return next(err)} 
        else {
              // Successful, so render
              res.render('director_list', { title: 'Director List', director_list:  list_directors});
          }
      });
    }
    
  };


  // Display director update form on GET.
  exports.director_update_get = function(req, res, next) {
  
    // Get director for form.
    async.parallel({
        director: function(callback) {
            Director.findById(req.params.id).exec(callback);
        },
        }, function(err, results) {
            if (err) { return next(err); }
            if (results.director==null) { // No results.
                var err = new Error('director not found');
                err.status = 404;
                return next(err);
            }
            // Success.
            res.render('director_update_form', { title: 'Update Director', director: results.director });
        });
  
  };
  
  // Handle director update on POST.
  exports.director_update_post = [
  
    // Process request after validation and sanitization.
    (req, res, next) => {
  
              // Create a director object with escaped and trimmed data.
              var director = new Director(
                {
                  dir_id: req.body.dir_id,
                  dir_name:req.body.dir_name,  
                  dir_dob: req.body.dir_dob,
                  dir_tmark: req.body.dir_tmark,
                  dir_nat: req.body.dir_nat,
                  dir_awards: req.body.dir_awards,
                  dir_thumb: req.body.dir_thumb,
                  //awards: String,
                  //poster: String,
                  //rating: Number
                  _id:req.params.id
                }
              );
  
        /*if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.
            async.parallel(function(err, results) {
                if (err) { return next(err); }
                res.render('director_form', { title: 'Update Director', director: director});
            });
            return;
        }
        else {*/
            // Data from form is valid. Update the record.
            Director.findByIdAndUpdate(req.params.id, director, {}, function (err,thedirector) {
                if (err) { return next(err); }
                   // Successful - redirect to director detail page.
                   res.redirect(thedirector.url);
                });
        //}
    }
  ];
  
  // Display director delete form on GET.
  exports.director_delete_get = function(req, res, next) {
  
    async.parallel({
        director: function(callback) {
            Director.findById(req.params.id).exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.director==null) { // No results.
            res.redirect('/admin/director');
        }
        // Successful, so render.
        res.render('director_delete', { title: 'Delete Director', director: results.director } );
    });
  
  };
  
  // Handle director delete on POST.
  exports.director_delete_post = function(req, res, next) {
  
    // Assume the post has valid id (ie no validation/sanitization).
  
    async.parallel({
        director: function(callback) {
            Director.findById(req.body.id).exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        // Success
            // Delete object and redirect to the list of director.
            Director.findByIdAndRemove(req.body.id, function deleteDirector(err) {
                if (err) { return next(err); }
                // Success - got to director list.
                res.redirect('/admin/director');
            });
    });
  
  };

  function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };