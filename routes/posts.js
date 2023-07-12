const express = require('express');
const {
  createPost,
  getPosts,
  getPost,
  deletePost,
  likePost,
  unlikePost,
  addComment,
  deleteComment,
} = require('../controllers/post');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.route('/').post(protect, createPost).get(protect, getPosts);

router.route('/:postId').get(protect, getPost).delete(protect, deletePost);

router.route('/like/:id').put(protect, likePost);

router.route('/unlike/:id').put(protect, unlikePost);

router.route('/comment/:id').put(protect, addComment);

router.route('/comment/:id/:commentId').delete(protect, deleteComment);

module.exports = router;
