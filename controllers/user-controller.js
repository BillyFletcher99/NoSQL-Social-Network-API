const {User, Thought} = require("../models");

const userController = {
 // get all users //
 getallUsers(req, res) {
  User.find({})
   .select("-__v")
   .sort({_id: -1})
   .then((dbUserData) => res.json(dbUserData))
   .catch((err) => {
    console.log(err);
    res.sendStatus(400);
   });
 },

 // get a single user by ID //
 getSingleUserById({params}, res) {
  User.findOne({_id: params.id})
   .populate({
    path: "thoughts",
    select: "-__v",
   })
   .populate({
    path: "friends",
    select: "-__v",
   })
   .then((dbUserData) => {
    if (!dbUserData) {
     res.status(404).json({message: "No account found by this ID"});
     return;
    }
    res.json(dbUserData);
   })
   .catch((err) => {
    console.log(err);
    res.sendStatus(400);
   });
 },

 // create new user //
 createNewUser({body}, res) {
  User.create(body)
   .then((dbUserData) => res.json(dbUserData))
   .catch((err) => res.json(err));
 },

 // update User by ID //
 updateUserById({params, body}, res) {
  User.findOneAndUpdate({_id: params.id}, body, {
   new: true,
   runValidators: true,
  })
   .then((dbUserData) => {
    if (!dbUserData) {
     res.status(404).json({message: "No account found by this ID"});
     return;
    }
    res.json(dbUserData);
   })
   .catch((err) => res.json(err));
 },

 //Delete user and users thoughts //
 deleteUserById({params}, res) {
  Thought.deleteMany({userId: params.id})
   .then(() => {
    User.findOneAndDelete({userId: params.id}).then((dbUserData) => {
     if (!dbUserData) {
      res.status(404).json({message: "No account found by this ID"});
      return;
     }
     res.json(dbUserData);
    });
   })
   .catch((err) => res.json(err));
 },

// Add friend to friend list //
 addFriendToFriendList({params}, res) {
  User.findOneAndUpdate(
   {_id: params.userId},
   {$push: {friends: params.friendId}},
   {new: true}
  )
   .then((dbUserData) => {
    if (!dbUserData) {
     res.status(404).json({message: "No account found by this ID"});
     return;
    }
    res.json(dbUserData);
   })
   .catch((err) => res.status(400).json(err));
 },
// remove friend from friend list //
 removeFriendFromFriendList({params}, res) {
  User.findOneAndUpdate(
   {_id: params.userId},
   {$pull: {friends: params.friendId}},
   {new: true}
  )
   .then((dbUserData) => {
    if (!dbUserData) {
     res.status(404).json({message: "No user to remove"});
     return;
    }
    res.json(dbUserData);
   })
   .catch((err) => res.status(400).json(err));
 },
};

module.exports = userController;