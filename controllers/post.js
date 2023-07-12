const asyncHandler = require('../middleware/async');
const Post = require('../models/Post');
const ErrorResponse = require('../utils/errorResponse');

//@route  POST api/post
//@desc   Create Post
//@access Private
exports.createPost = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  req.body.name = req.user.name;
  req.body.avatar = req.user.avatar;

  const post = await Post.create(req.body);

  res.status(200).json({
    success: true,
    data: post,
  });
});

//@route  GET api/post
//@desc   Get all posts
//@access Private
exports.getPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find().sort({ date: -1 });

  res.status(200).json({
    count: posts.length,
    success: true,
    data: posts,
  });
});

//@route  GET api/post/:postId
//@desc   Get post by Id
//@access Private
exports.getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.postId);

  if (!post) {
    return next(
      new ErrorResponse(`Post not found with ID ${req.params.postId}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: post,
  });
});

//@route  Delete api/post/:postId
//@desc   Delete post by Id
//@access Private
exports.deletePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.postId);

  if (!post) {
    return next(
      new ErrorResponse(`Post not found with ID ${req.params.postId}`, 404)
    );
  }

  if (req.user.id !== post.user.toString()) {
    return next(new ErrorResponse('Not authorized to delete this post', 401));
  }

  await post.remove();

  res.status(200).json({
    success: true,
    data: 'Post deleted.',
  });
});

//@route  PUT api/post/like/:id
//@desc   Like a post
//@access Private
exports.likePost = asyncHandler(async (req, res, next) => {
  let post = await Post.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`Post not found with ID ${req.params.id}`, 404)
    );
  }

  alreadyLiked =
    post.likes.filter((like) => like.user.toString() === req.user.id).length >
    0;

  if (alreadyLiked) {
    return next(new ErrorResponse('Post already liked', 400));
  }

  req.body.user = req.user.id;

  post.likes.unshift(req.body);

  await post.save();

  res.status(200).json({
    success: true,
    count: post.likes.length,
    data: post.likes,
  });
});

//@route  PUT api/post/unlike/:id
//@desc   Unlike a post
//@access Private
exports.unlikePost = asyncHandler(async (req, res, next) => {
  let post = await Post.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`Post not found with ID ${req.params.id}`, 404)
    );
  }

  alreadyLiked =
    post.likes.filter((like) => like.user.toString() === req.user.id).length ===
    0;

  if (alreadyLiked) {
    return next(new ErrorResponse('Post has not been liked yet', 400));
  }

  const updatedLikes = post.likes.filter(
    (like) => like.user.toString() !== req.user.id
  );

  post.likes = updatedLikes;

  await post.save();

  res.status(200).json({
    success: true,
    count: post.likes.length,
    data: post.likes,
  });
});

//@route  PUT api/post/comment/:id
//@desc   Add Comment
//@access Private
exports.addComment = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`Post not found with ID ${req.params.id}`, 404)
    );
  }

  req.body.user = req.user.id;
  req.body.name = req.user.name;
  req.body.avatar = req.user.avatar;

  post.comments.unshift(req.body);

  await post.save();

  res.status(200).json({
    success: true,
    data: post,
  });
});

//@route  Delete api/post/comment/:id/:commentId
//@desc   Delete Comment
//@access Private
exports.deleteComment = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`Post not found with ID ${req.params.id}`, 404)
    );
  }

  const comment = post.comments.find(
    (comment) => comment.id === req.params.commentId
  );

  if (!comment) {
    return next(
      new ErrorResponse(
        `Comment not found with ID ${req.params.commentId}`,
        404
      )
    );
  }

  if (comment.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `Not authorized to delete comment with ID ${req.params.commentId}`,
        404
      )
    );
  }

  updatedComments = post.comments.filter(
    (comment) => comment.id !== req.params.commentId
  );

  post.comments = updatedComments;

  await post.save();

  res.status(200).json({
    success: true,
    data: post,
  });
});
