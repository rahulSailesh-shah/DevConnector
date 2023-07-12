import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do no match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <>
      <section className='container'>
        <h1 className='large text-primary'>Sign Up</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Create Your Account
        </p>
        <form
          className='form'
          action='create-profile.html'
          onSubmit={(e) => onSubmit(e)}
        >
          <div className='form-group'>
            <input
              value={name}
              onChange={(e) => onChange(e)}
              type='text'
              placeholder='Name'
              name='name'
              // required
            />
          </div>
          <div className='form-group'>
            <input
              value={email}
              onChange={(e) => onChange(e)}
              type='email'
              placeholder='Email Address'
              name='email'
              // required
            />
            <small className='form-text'>
              This site uses Gravatar so if you want a profile image, use a
              Gravatar email
            </small>
          </div>
          <div className='form-group'>
            <input
              value={password}
              onChange={(e) => onChange(e)}
              type='password'
              placeholder='Password'
              name='password'
              // minLength='6'
              // required
            />
          </div>
          <div className='form-group'>
            <input
              value={password2}
              onChange={(e) => onChange(e)}
              type='password'
              placeholder='Confirm Password'
              name='password2'
              // minLength='6'
              // required
            />
          </div>
          <input type='submit' className='btn btn-primary' value='Register' />
        </form>
        <p className='my-1'>
          Already have an account? <Link to='/login'>Sign In</Link>
        </p>
      </section>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps, { setAlert, register })(Register);
