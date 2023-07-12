const express = require('express');
const {
  getLoggedinUserProfile,
  createOrUpdateProfile,
  getProfiles,
  getProfile,
  deleteProfile,
  addExperience,
  deleteExperience,
  addEducation,
  deleteEducation,
} = require('../controllers/profile');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.route('/me').get(protect, getLoggedinUserProfile);

router
  .route('/')
  .get(getProfiles)
  .post(protect, createOrUpdateProfile)
  .delete(protect, deleteProfile);

router.route('/experience').put(protect, addExperience);

router.route('/experience/:expId').delete(protect, deleteExperience);

router.route('/education').put(protect, addEducation);

router.route('/education/:eduId').delete(protect, deleteEducation);

router.route('/:userId').get(getProfile);

module.exports = router;
