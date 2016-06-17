var Movie = require("../models/movie");

var MoviesController = {
  listMovies: function(req, res, next) {
    // giving a callback function to handle error or render view
    Movie.all(function(error, movies) {
      if(error) {
        var err = new Error("Error retrieving movie list:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(movies)
        // var locals = { movies: movies }
        // res.render("movies/index", locals);
      }
    });
  },
sortBy: function(req, res, next) {
  var options = {
    order: req.params.field,
    limit: req.query.n,
    offset: req.query.p
  }

  Movie.sortBy(options, function(error, movies) {
    if(error) {
      var err = new Error("Error retrieving sorted movie list:\n" + error.message);
      err.status = 500;
      next(err);
    } else {
      res.json(movies)
      // var locals = { movies: movies }
      // res.render("movies/index", locals);
    }
  });
 },

  // current: function(req, res, next)  {
  //
  // },
  //
  // sortByHistory: function(req, res, next)  {
  //
  // }
}
module.exports = MoviesController;
