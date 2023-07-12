const asyncHandler = require('../middleware/async');
const Profile = require('../models/Profile');
const ErrorResponse = require('../utils/errorResponse');

//@route  GET api/profile/me
//@desc   Get logged in users Profile
//@access Private
exports.getLoggedinUserProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.user.id }).populate(
    'user',
    ['name', 'avatar']
  );

  if (!profile) {
    return next(new ErrorResponse('There is no profile for this user', 400));
  }

  res.status(200).json({
    success: true,
    data: profile,
  });
});

//@route  POST api/profile
//@desc   Create or Update Profile
//@access Private
exports.createOrUpdateProfile = asyncHandler(async (req, res, next) => {
  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin,
  } = req.body;

  const profileFields = {};
  profileFields.user = req.user.id;

  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (githubusername) profileFields.githubusername = githubusername;
  if (status) profileFields.status = status;

  if (skills) {
    profileFields.skills = skills.split(',').map((skill) => skill.trim());
  }

  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (facebook) profileFields.social.facebook = facebook;
  if (twitter) profileFields.social.twitter = twitter;
  if (instagram) profileFields.social.instagram = instagram;
  if (linkedin) profileFields.social.linkedin = linkedin;

  let profile = await Profile.findOne({ user: req.user.id });

  if (profile) {
    profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      profileFields,
      { new: true, runValidators: true }
    );

    return res.status(200).json({ success: true, data: profile });
  }

  profile = await Profile.create(profileFields);

  res.status(200).json({ success: true, data: profile });
});

//@route  GET api/profile/
//@desc   Get all profiles
//@access Public
exports.getProfiles = asyncHandler(async (req, res, next) => {
  const profile = await Profile.find().populate('user', ['name', 'avatar']);

  res.status(200).json({
    success: true,
    count: profile.length,
    data: profile,
  });
});

//@route  GET api/profile/:userId
//@desc   Get profile by userID
//@access Public
exports.getProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.params.userId }).populate(
    'user',
    ['name', 'avatar']
  );

  if (!profile) {
    return next(
      new ErrorResponse(
        `No profile found for the user with ID ${req.params.userId}`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    data: profile,
  });
});

//@route  Delete api/profile/
//@desc   Delete logged in users profile
//@access Private
exports.deleteProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.user.id });

  if (!profile) {
    return next(
      new ErrorResponse(
        `No profile found for the user with ID ${req.params.userId}`,
        404
      )
    );
  }

  await profile.remove();

  res.status(200).json({
    success: true,
    data: 'User Deleted',
  });
});

//@route  PUT api/profile/expierence
//@desc   Add Profile expierence
//@access Private
exports.addExperience = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.user.id });
  profile.experience.unshift(req.body);
  await profile.save();

  res.status(200).json({
    success: true,
    data: profile,
  });
});

//@route  Delete api/profile/expierence/:expId
//@desc   Delete expierence from profile
//@access Private
exports.deleteExperience = asyncHandler(async (req, res, next) => {
  let profile = await Profile.findOne({ user: req.user.id });

  updatedExperience = profile.experience.filter(
    (exp) => exp._id.toString() !== req.params.expId
  );

  profile.experience = updatedExperience;

  await profile.save();

  res.status(200).json({
    success: true,
    data: profile,
  });
});

//@route  PUT api/profile/education
//@desc   Add Profile education
//@access Private
exports.addEducation = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.user.id });
  profile.education.unshift(req.body);
  await profile.save();

  res.status(200).json({
    success: true,
    data: profile,
  });
});

//@route  Delete api/profile/education/:eduId
//@desc   Delete education from profile
//@access Private
exports.deleteEducation = asyncHandler(async (req, res, next) => {
  let profile = await Profile.findOne({ user: req.user.id });

  updatedEducation = profile.education.filter(
    (edu) => edu._id.toString() !== req.params.eduId
  );

  profile.education = updatedEducation;

  await profile.save();

  res.status(200).json({
    success: true,
    data: profile,
  });
});
