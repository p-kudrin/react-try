const FETCH_BRAND = 'brand/FETCH';
const FETCH_BRAND_SUCCESS = 'brand/FETCH_SUCCESS';
const FETCH_BRAND_FAIL = 'brand/FETCH_FAIL';
const CHOOSE_BRAND = 'brand/CHOOSE_BRAND';

export const initialState = {
  items: []
};

// Reducer

export default function brandReducer(state = initialState, action) {
  switch (action.type) {
  	case FETCH_BRAND:
      return {
        ...state,
        items: []
      };
  	case FETCH_BRAND_SUCCESS:
      return {
        ...state,
        items: action.result.data
      };
    case CHOOSE_BRAND:
        return {
          ...state,
          brandId: action.id
        };
    default:
      return state;
  }
}

// Actions

export function fetchBrand() {
	return  {
		types: [FETCH_BRAND, FETCH_BRAND_SUCCESS, FETCH_BRAND_FAIL],
	    promise: client => client.get('/api/brand/list')    
	};
}

export function chooseBrand(id) {	  
	return  {
	    type: CHOOSE_BRAND,
	    id
	};
}

