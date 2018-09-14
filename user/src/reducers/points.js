import { browserHistory } from 'react-router';

const FETCH_POINTS = 'points/FETCH_POINTS';
const FETCH_POINTS_SUCCESS = 'points/FETCH_POINTS_SUCCESS';
const FETCH_POINTS_FAIL = 'points/FETCH_POINTS_FAIL';
const CHOOSE_POINT = 'points/CHOOSE_POINT';
const CHOOSE_POINT_SUCCESS = 'points/CHOOSE_POINT_SUCCESS';
const CHOOSE_POINT_FAIL = 'points/CHOOSE_POINT_FAIL';
const NO_POINTS = 'points/NO_POINTS';

export const initialState = {
	items: [],
	selectedPoint: undefined
};

// Reducer

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_POINTS_SUCCESS:    
        return {
          ...state,
          items: action.result.data
        };
    case CHOOSE_POINT_SUCCESS:    
        return {
          ...state,
          selectedPoint: action.result.data
        };
    case NO_POINTS:    
        return {
          ...state,
          selectedPoint: action.select
        };
    default:
      return state;
  }
}

export function fetchTradePoints(id) {
	return {
		types: [FETCH_POINTS, FETCH_POINTS_SUCCESS, FETCH_POINTS_FAIL],
	    promise: (client) => client.get('/api/org/' + id + '/points')
	}
}

export function fetchPointsList() {
	return {
		types: [FETCH_POINTS, FETCH_POINTS_SUCCESS, FETCH_POINTS_FAIL],
	    promise: (client) => client.get('/api/users/points'),
		afterSuccess: (dispatch, getState, response) => {        
			let items = response.data;
			if (items.length === 0) {
				dispatch(choosePoint(undefined));
				browserHistory.push('/brand');
			} else if (items.length === 1) {
				dispatch(choosePoint(items[0].id));
			}
		}
	}
}

export function choosePoint(id) {
	if (id)
		return {
			types: [CHOOSE_POINT, CHOOSE_POINT_SUCCESS, CHOOSE_POINT_FAIL],
			promise: (client) => client.get('/api/points/' + id),
			afterSuccess: (dispatch, getState, response) => {        
				browserHistory.push('/brand');
			}
		};
	else
		return {
			type: NO_POINTS,
			select : {}
		}
}

