import axios from 'axios';
import { setAlert } from './alert';

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/post');
    dispatch({
      type: 'GET_POSTS',
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: 'POST_ERROR',
      payload: { msg: err.response.data.error, status: err.response.status },
    });
  }
};

export const addLike = (postId) => async (dispatch) => {
  try {
    await axios.put(`/api/post/like/${postId}`);
    const res = await axios.get('/api/post');
    dispatch({
      type: 'GET_POSTS',
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: 'POST_ERROR',
      payload: { msg: err.response.data.error, status: err.response.status },
    });
  }
};

export const removeLike = (postId) => async (dispatch) => {
  try {
    await axios.put(`/api/post/unlike/${postId}`);
    const res = await axios.get('/api/post');
    dispatch({
      type: 'GET_POSTS',
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: 'POST_ERROR',
      payload: { msg: err.response.data.error, status: err.response.status },
    });
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    await axios.delete(`/api/post/${postId}`);
    const res = await axios.get('/api/post');
    dispatch({
      type: 'GET_POSTS',
      payload: res.data.data,
    });
    dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    dispatch({
      type: 'POST_ERROR',
      payload: { msg: err.response.data.error, status: err.response.status },
    });
  }
};

export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    await axios.post('/api/post', formData, config);
    const res = await axios.get('/api/post');
    dispatch({
      type: 'GET_POSTS',
      payload: res.data.data,
    });
    dispatch(setAlert('Post Added', 'success'));
  } catch (err) {
    dispatch({
      type: 'POST_ERROR',
      payload: { msg: err.response.data.error, status: err.response.status },
    });
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/post/${id}`);
    dispatch({
      type: 'GET_POST',
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: 'POST_ERROR',
      payload: { msg: err.response.data.error, status: err.response.status },
    });
  }
};

export const addComment = (formData, id) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.put(`/api/post/comment/${id}`, formData, config);
    dispatch({
      type: 'GET_POST',
      payload: res.data.data,
    });
    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    dispatch({
      type: 'POST_ERROR',
      payload: { msg: err.response.data.error, status: err.response.status },
    });
  }
};

export const removeComment = (postId, commentId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/post/comment/${postId}/${commentId}`);
    dispatch({
      type: 'GET_POST',
      payload: res.data.data,
    });
    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: 'POST_ERROR',
      payload: { msg: err.response.data.error, status: err.response.status },
    });
  }
};
