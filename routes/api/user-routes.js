const router = require('express').Router();
const {
  allUsers,
  getSingleUserById,
  createNewUser,
  updateUserById,
  deleteUserById,
  addFriendToFriendList,
  removeFriendFromFriendList,
} = require('../../controllers/user-controller');

// `/api/users' //
router.route('/').get(allUsers).post(createNewUser);

// `/api/users/ID' //
router.route('/:Id').get(getSingleUserById).get(updateUserById).delete(deleteUserById);

// `/api/users/:userId/friends` //
router.route('/:Id').get(addFriendToFriendList).delete(removeFriendFromFriendList);

module.exports = router;
