import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';

const CommentForm = ({ addComment, postId }) => {
  const [formData, setFormData] = useState({
    text: '',
  });

  const { text } = formData;

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Leave a Comment...</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={(e) => {
          e.preventDefault();
          addComment(formData, postId);
          setFormData({ ...formData, text: '' });
        }}
      >
        <textarea
          value={text}
          onChange={(e) => setFormData({ ...formData, text: e.target.value })}
          name='text'
          cols='30'
          rows='5'
          placeholder='Add a comment'
          required
        ></textarea>
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

export default connect(null, { addComment })(CommentForm);
