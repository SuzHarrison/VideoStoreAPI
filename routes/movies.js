var express = require('express');
var router = express.Router();
var MoviesController = require('../controllers/movies_controller.js');

router.get('/', MoviesController.listMovies)
router.get('/sort/:field', MoviesController.sortBy)
router.get('/:title/current', MoviesController.current)
router.get('/:title/history/sort/:field', MoviesController.history)

module.exports = router;
