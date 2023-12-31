/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import { Link, withRouter } from 'react-router-dom';

const CreateProfile = ({
  createProfile,
  history,
  profile: { profile, loading },
  getCurrentProfile,
}) => {
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    getCurrentProfile();

    if (profile !== null) {
      setFormData({
        company: loading || !profile.company ? '' : profile.company,
        website: loading || !profile.website ? '' : profile.website,
        location: loading || !profile.location ? '' : profile.location,
        status: loading || !profile.status ? '' : profile.status,
        skills: loading || !profile.skills ? '' : profile.skills.join(','),
        githubusername:
          loading || !profile.githubusername ? '' : profile.githubusername,
        bio: loading || !profile.bio ? '' : profile.bio,
        twitter: loading || !profile.social ? '' : profile.social.twitter,
        facebook: loading || !profile.social ? '' : profile.social.facebook,
        youtube: loading || !profile.social ? '' : profile.social.youtube,
        instagram: loading || !profile.social ? '' : profile.social.instagram,
        linkedin: loading || !profile.social ? '' : profile.social.linkedin,
      });
    }
  }, [loading]);

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const edit = profile ? true : false;
    createProfile(formData, history, edit);
  };

  return (
    <>
      <h1 className='large text-primary'>
        {' '}
        {profile === null ? 'Create ' : 'Edit '}Your Profile
      </h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <select value={status} onChange={(e) => onChange(e)} name='status'>
            <option value='0'>* Select Professional Status</option>
            <option value='Developer'>Developer</option>
            <option value='Junior Developer'>Junior Developer</option>
            <option value='Senior Developer'>Senior Developer</option>
            <option value='Manager'>Manager</option>
            <option value='Student or Learning'>Student or Learning</option>
            <option value='Instructor'>Instructor or Teacher</option>
            <option value='Intern'>Intern</option>
            <option value='Other'>Other</option>
          </select>
          <small className='form-text'>
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className='form-group'>
          <input
            value={company}
            onChange={(e) => onChange(e)}
            type='text'
            placeholder='Company'
            name='company'
          />
          <small className='form-text'>
            Could be your own company or one you work for
          </small>
        </div>
        <div className='form-group'>
          <input
            value={website}
            onChange={(e) => onChange(e)}
            type='text'
            placeholder='Website'
            name='website'
          />
          <small className='form-text'>
            Could be your own or a company website
          </small>
        </div>
        <div className='form-group'>
          <input
            value={location}
            onChange={(e) => onChange(e)}
            type='text'
            placeholder='Location'
            name='location'
          />
          <small className='form-text'>
            City and state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className='form-group'>
          <input
            value={skills}
            onChange={(e) => onChange(e)}
            type='text'
            placeholder='* Skills'
            name='skills'
          />
          <small className='form-text'>
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className='form-group'>
          <input
            value={githubusername}
            onChange={(e) => onChange(e)}
            type='text'
            placeholder='Github Username'
            name='githubusername'
          />
          <small className='form-text'>
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className='form-group'>
          <textarea
            value={bio}
            onChange={(e) => onChange(e)}
            placeholder='A short bio of yourself'
            name='bio'
          ></textarea>
          <small className='form-text'>Tell us a little about yourself</small>
        </div>

        <div className='my-2'>
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type='button'
            className='btn btn-light'
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <>
            <div className='form-group social-input'>
              <i className='fab fa-twitter fa-2x'></i>
              <input
                value={twitter}
                onChange={(e) => onChange(e)}
                type='text'
                placeholder='Twitter URL'
                name='twitter'
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x'></i>
              <input
                value={facebook}
                onChange={(e) => onChange(e)}
                type='text'
                placeholder='Facebook URL'
                name='facebook'
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x'></i>
              <input
                type='text'
                placeholder='YouTube URL'
                name='youtube'
                value={youtube}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-linkedin fa-2x'></i>
              <input
                value={linkedin}
                onChange={(e) => onChange(e)}
                type='text'
                placeholder='Linkedin URL'
                name='linkedin'
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x'></i>
              <input
                value={instagram}
                onChange={(e) => onChange(e)}
                type='text'
                placeholder='Instagram URL'
                name='instagram'
              />
            </div>
          </>
        )}

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back.
        </Link>
      </form>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  };
};

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(CreateProfile)
);
