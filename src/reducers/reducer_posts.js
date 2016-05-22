import { FETCH_POSTS, FETCH_POST } from '../actions';

const INIT_STATE = {
	all: [],
	post: null
};
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_POST]: (state, action) => ({ ...state, post: action.payload.data }),
  [FETCH_POSTS]: (state, action) => ({ ...state, all: action.payload.data })
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function ( state = INIT_STATE, action ) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}





// export default function( state = INIT_STATE, action) {
// 	switch (action.type) {
//     case FETCH_POST:
//       return { ...state, post: action.payload.data };
// 		case FETCH_POSTS:
// 			return { ...state, all: action.payload.data };
// 		default: 
// 			return state;
// 	}
// }
// 
// const ACTION_HANDLERS = {
//   [FETCH_POST]: () => Object.assign( {}, ...state, { post: action.payload.data } ),
//   [FETCH_POSTS]: () => Object.assign( {}, ...state, { all: action.payload.data } )
// };
