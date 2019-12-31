var Actor = require('../models/actor');
var async = require ('async');

// Display actor create form on GET.
exports.actor_create_get = function(req, res) {
        res.render('actor_form', { title: 'Create Actor'});
};

// Display detail page for a specific actor.
exports.actor_detail = function(req, res, next) {
 
    async.parallel({
        actor: function(callback) {
  
            Actor.findById(req.params.id)
              .exec(callback);
        }
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.actor==null) { // No results.
            var err = new Error('actor not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('actor_detail', { title: 'Title', actor:  results.actor } );
    });
  
  };
    

// Handle actor create on POST.
exports.actor_create_post = function(req, res) {
    var actor = new Actor(
        {
            act_name: req.body.act_name,
            act_dob: req.body.act_dob,
            act_abt: req.body.act_abt,
            act_nat: req.body.act_nat,
            act_awards: req.body.act_awards,
            act_thumb: req.body.act_thumb
        }
      );
    actor.save()
        .then(item => {
          /*  res.send("Actor saved to database");  */
          res.render('actor_form');
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
};

// Display list of all actor.
exports.actor_list = function(req, res, next) {
  
  if(req.query.search) {
    const regex = new RegExp(escapeRegex(req.query.search), 'gi');
    Actor.find({act_name:regex}, 'act_name act_thumb act_tmark')
    //.populate('mov_dir')
    .exec(function (err, list_actor) {
      if (err) {return next(err)} 
      else if(list_actor== ''){
            // Successful, so render
            res.render('actor_list', { title: 'No Actor Found Please Add Actor!', actor_list:  list_actor});
        }
        else{
          res.render('actor_list', { title: 'ACTOR FOUND!', actor_list:  list_actor});
        }
    });
  } else {
    //eval(require('locus'));
    Actor.find({}, 'act_name act_thumb act_tmark')
    //.populate('mov_dir')
    .exec(function (err, list_actor) {
      if (err) {return next(err)} 
      else {
            // Successful, so render
            res.render('actor_list', { title: 'Actor List', actor_list:  list_actor});
        }
    });
  }
  
}; 
  /*  if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Actor.find({act_name:regex}, 'act_name act_thumb ')
        //.populate('mov_dir')
        .exec(function (err, list_actor) {
          if (err) {return next(err)} 
          else {
                // Successful, so render
                res.render('actor_list', { title: 'Actor List', actor_list:  list_actor});
            }
        });
      } else {

    Actor.find({}, 'act_name act_thumb act_dob')
      //.populate('act_dir')
      .exec(function (err, list_actor) {
        if (err) {return next(err)} 
        else {
              // Successful, so render
              res.render('actor_list', { title: 'Actor List', actor_list:  list_actor});
          }
      });
    }
  
  };
*/


  // Display detail page for a specific actor.
exports.actor_detail = function(req, res, next) {
 
    async.parallel({
        actor: function(callback) {
  
            Actor.findById(req.params.id)
              .exec(callback);
        }
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.actor==null) { // No results.
            var err = new Error('Actor not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
      res.render('actor_detail', { title: 'Title', actor:  results.actor } );
    });
  
  };
  
  // Display actor update form on GET.
  exports.actor_update_get = function(req, res, next) {
  
    // Get actor for form.
    async.parallel({
        actor: function(callback) {
            Actor.findById(req.params.id).exec(callback);
        },
        }, function(err, results) {
            if (err) { return next(err); }
            if (results.actor==null) { // No results.
                var err = new Error('actor not found');
                err.status = 404;
                return next(err);
            }
            // Success.
            res.render('actor_update_form', { title: 'Update Actor', actor: results.actor });
        });
  
  };
  
  // Handle actor update on POST.
  exports.actor_update_post = [
  
    // Process request after validation and sanitization.
    (req, res, next) => {
  
              // Create a director object with escaped and trimmed data.
              var actor = new Actor(
                {
                  act_id: req.body.act_id,
                  act_name:req.body.act_name,  
                  act_dob: req.body.act_dob,
                  act_abt: req.body.act_abt,
                  act_nat: req.body.act_nat,
                  act_awards: req.body.act_awards,
                  act_thumb: req.body.act_thumb,
                  //awards: String,
                  //poster: String,
                  //rating: Number
                  _id:req.params.id
                }
              );
  
      /*  if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.
            async.parallel(function(err, results) {
                if (err) { return next(err); }
                res.render('actor_form', { title: 'Update Actor', actor: actor});
            });
            return;
        }
        else {  */
            // Data from form is valid. Update the record.
            Actor.findByIdAndUpdate(req.params.id, actor, {}, function (err,theactor) {
                if (err) { return next(err); }
                   // Successful - redirect to director detail page.
                   res.redirect(theactor.url);
                });
      //  }
    }
  ];
  
  // Display actor delete form on GET.
  exports.actor_delete_get = function(req, res, next) {
  
    async.parallel({
        actor: function(callback) {
            Actor.findById(req.params.id).exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.actor==null) { // No results.
            res.redirect('/admin/actor');
        }
        // Successful, so render.
        res.render('actor_delete', { title: 'Delete Actor', actor: results.actor } );
    });
  
  };
  
  // Handle actor delete on POST.
  exports.actor_delete_post = function(req, res, next) {
  
    // Assume the post has valid id (ie no validation/sanitization).
  
    async.parallel({
        actor: function(callback) {
            Actor.findById(req.body.id).exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        // Success
            // Delete object and redirect to the list of actor.
            Actor.findByIdAndRemove(req.body.id, function deleteActor(err) {
                if (err) { return next(err); }
                // Success - got to actor list.
                res.redirect('/admin/actor');
            });
    });
  
  };
  
  function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };