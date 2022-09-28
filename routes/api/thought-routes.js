const router = require('express').Router();
const {
  getAllThoughts,
  getSingleThoughtById,
  postNewThought,
  updateThoughtById,
  deleteThoughtByid,
  postReaction,
  deleteReaction,

} = require('../../controllers/thought-controller');

//`/api/thoughts`//
router.route('/').get(getAllThoughts).get(getSingleThoughtById).post(postNewThought);

//`/api/thoughts/:thoughtId/reactions`//
router.route('/:thoughtId').get(updateThoughtById).delete(deleteThoughtByid);

//`/api/thoughts/:thoughtId/reactions`//
router.route('/:thoughtId/reactions').post(postReaction).delete(deleteReaction);

module.exports = router;