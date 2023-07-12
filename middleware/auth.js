const User = require('../models/User');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');

exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    decodedId = jwt.verify(token, process.env.JWT_SECRET).id;
    req.user = await User.findOne({ _id: decodedId });
    next();
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
});
