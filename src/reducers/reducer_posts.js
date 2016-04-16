import { FETCH_POSTS, FETCH_POST } from '../actions';

const INIT_STATE = {
	all: [],
	post: null
};

export default function( state = INIT_STATE, action) {
	switch (action.type) {
    case FETCH_POST:
      return { ...state, post: action.payload.data };
		case FETCH_POSTS:
			return { ...state, all: action.payload.data };
		default: 
			return state;
	}
}