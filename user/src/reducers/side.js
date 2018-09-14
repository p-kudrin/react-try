import { browserHistory } from 'react-router';

const FETCH_SIDE = 'side/FETCH';
const FETCH_SIDE_SUCCESS = 'side/FETCH_SUCCESS';
const FETCH_SIDE_FAIL = 'side/FETCH_FAIL';
const CHOOSE_SIDE = 'side/CHOOSE';


const initialState = {
	items: []
};

// Reducer

export default function sideReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SIDE_SUCCESS:
      return {
        ...state,
        items: action.result.data,
        active: undefined,
        sended: false
      };
    case CHOOSE_SIDE:
        return {
          ...state,
          active: action.side_id
        };
    default:
      return state;
  }
}

// Actions

export function fetchSides() {  
	return  {
		types: [FETCH_SIDE, FETCH_SIDE_SUCCESS, FETCH_SIDE_FAIL],
		promise: client => client.get('/api/side/list')
	};
}

export function chooseSide(side_id) {	  
	return  {
		type: CHOOSE_SIDE,
	    side_id
	};
}