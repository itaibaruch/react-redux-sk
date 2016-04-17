import {fetchPosts, createPost, fetchPost, deletePost} from './post_CRUD';

export const FETCH_POSTS = 'FETCH_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const FETCH_POST = 'FETCH_POST';
export const DELETE_POST = 'DELETE_POST';

// export const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
// export const API_KEY = '?key=ofsnbrvn0wdkf30dsd';
export const ROOT_URL = 'http://localhost:3000/api';
export const API_KEY = '';

export {
  fetchPosts, createPost, fetchPost, deletePost
}
