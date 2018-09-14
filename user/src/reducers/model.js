import { browserHistory } from 'react-router';

const FETCH_MODEL = 'model/FETCH';
const FETCH_MODEL_SUCCESS = 'model/FETCH_SUCCESS';
const FETCH_MODEL_FAIL = 'model/FETCH_FAIL';
const CHOOSE_MODEL = 'model/CHOOSE_MODEL';
const FIND_MODELS = 'model/FIND_MODELS';
const FIND_MODELS_SUCCESS = 'model/FIND_MODELS_SUCCESS';
const FIND_MODELS_FAIL = 'model/FIND_MODELS_FAIL';

export const initialState = {
  items: []
};

// Reducer

export default function modelReducer(state = initialState, action) {
  switch (action.type) {
  	case FETCH_MODEL:
      return {
        ...state,
        items: []
      };
  	case FETCH_MODEL_SUCCESS:
      return {
        ...state,
        items: action.result.data
      };
    case FIND_MODELS_SUCCESS:
        return {
          ...state,
          items: action.result.data
        };
    case CHOOSE_MODEL:
        return {
          ...state,
          modelId: action.id
        };
    default:
      return state;
  }
}

// Actions

export function fetchModels(id) {
	return  {
		types: [FETCH_MODEL, FETCH_MODEL_SUCCESS, FETCH_MODEL_FAIL],
	    promise: client => client.get('/api/brand/' + id + '/models')
	};
}

export function chooseModel(id) {	  
	return  {
	    type: CHOOSE_MODEL,
	    id
	};
}

export function findModels(name) {
	return  {
		types: [FIND_MODELS, FIND_MODELS_SUCCESS, FIND_MODELS_FAIL],
	    promise: client => client.get('/api/model/like/' + name),
	    afterSuccess: (dispatch, getState, response) => {
	        browserHistory.push('/brand/models');
	    }
	};
}
