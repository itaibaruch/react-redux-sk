import axios from 'axios';
import {
  ROOT_URL, API_KEY, 
  FETCH_POSTS, CREATE_POST, FETCH_POST, DELETE_POST, EDIT_POST
} from './';

export function fetchPosts() {

  const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);

  return {
    type: FETCH_POSTS,
    payload: request
  }
}

export function createPost(props) {

  const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, props);

  return {
    type: CREATE_POST,
    payload: request
  }
}

export function fetchPost(id) {

  const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

  return {
    type: FETCH_POST,
    payload: request
  }
}

export function deletePost(id) {

  const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`);

  return {
    type: DELETE_POST,
    payload: request
  }
}


export function editPost(id, props) {

  const request = axios.put(`${ROOT_URL}/posts/edit/${id}${API_KEY}`, props);

  return {
    type: EDIT_POST,
    payload: request
  }
}