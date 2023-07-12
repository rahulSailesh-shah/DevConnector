/* eslint-disable import/no-anonymous-default-export */
const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'GET_POSTS':
      return {
        ...state,
        posts: payload,
        loading: false,
      };

    case 'GET_POST':
      return {
        ...state,
        post: payload,
        loading: false,
      };

    case 'POST_ERROR':
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
