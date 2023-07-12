const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  company: { type: String },
  website: { type: String },
  location: { type: String },
  bio: { type: String },
  githubusername: { type: String },
  status: { type: String, required: [true, 'Please provide a status'] },
  skills: {
    type: [String],
    required: [true, 'Please provide skills'],
    default: undefined,
  },
  experience: [
    {
      title: { type: String, required: [true, 'Please provide a Job title'] },
      company: {
        type: String,
        required: [true, 'Please provide company name'],
      },
      location: { type: String },
      from: { type: Date, required: [true, 'Please provide joining date'] },
      to: { type: Date },
      current: { type: Boolean, default: false },
      description: { type: String },
    },
  ],
  education: [
    {
      school: { type: String, required: [true, 'Please provide school name'] },
      degree: { type: String, required: [true, 'Please provide degree name'] },
      fieldofstudy: {
        type: String,
        required: [true, 'Please provide field of study'],
      },
      from: { type: Date, required: [true, 'Please provide starting date'] },
      to: { type: Date },
      current: { type: Boolean, default: false },
      description: { type: String },
    },
  ],
  social: {
    youtube: { type: String },
    twitter: { type: String },
    facebook: { type: String },
    linkedin: { type: String },
    instagram: { type: String },
  },
  date: { type: Date, default: Date.now },
});

ProfileSchema.pre('remove', async function (next) {
  await this.model('User').deleteOne({ _id: this.user });
  await this.model('Post').deleteMany({ user: this.user });
  next();
});

module.exports = mongoose.model('Profile', ProfileSchema);
