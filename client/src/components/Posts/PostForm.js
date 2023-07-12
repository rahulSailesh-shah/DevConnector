import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost }) => {
  const [formData, setFormData] = useState({
    text: '',
  });

  const { text } = formData;

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Say Something...</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={(e) => {
          e.preventDefault();
          addPost(formData);
          setFormData({ ...formData, text: '' });
        }}
      >
        <textarea
          value={text}
          onChange={(e) => setFormData({ ...formData, text: e.target.value })}
          name='text'
          cols='30'
          rows='5'
          placeholder='Create a post'
          required
        ></textarea>
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

export default connect(null, { addPost })(PostForm);
