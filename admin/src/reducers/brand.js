import {browserHistory} from 'react-router';

const FETCH_BRAND = 'brand/FETCH';
const FETCH_BRAND_SUCCESS = 'brand/FETCH_SUCCESS';
const FETCH_BRAND_FAIL = 'brand/FETCH_FAIL';
const OPEN_BRAND = 'brand/OPEN_BRAND';
const OPEN_BRAND_SUCCESS = 'brand/OPEN_BRAND_SUCCESS';
const OPEN_BRAND_FAIL = 'brand/OPEN_BRAND_FAIL';
const NEW_BRAND_OPEN = 'brand/NEW_BRAND_OPEN';
const CREATE_BRAND = 'brand/CREATE_BRAND';
const CREATE_BRAND_SUCCESS = 'brand/CREATE_BRAND_SUCCESS';
const CREATE_BRAND_FAIL = 'brand/CREATE_BRAND_FAIL';
const REMOVE_BRAND = 'brand/REMOVE_BRAND';
const REMOVE_BRAND_SUCCESS = 'brand/REMOVE_BRAND_SUCCESS';
const REMOVE_BRAND_FAIL = 'brand/REMOVE_BRAND_FAIL';
const CHOOSE_BRAND = "brand/CHOOSE_BRAND";
const ACTIVATE_BRAND = 'brand/ACTIVATE_BRAND';
const ACTIVATE_BRAND_SUCCESS = 'brand/ACTIVATE_BRAND_SUCCESS';
const ACTIVATE_BRAND_FAIL = 'brand/ACTIVATE_BRAND_FAIL';
const DEACTIVATE_BRAND = 'brand/DEACTIVATE_BRAND';
const DEACTIVATE_BRAND_SUCCESS = 'brand/DEACTIVATE_BRAND_SUCCESS';
const DEACTIVATE_BRAND_FAIL = 'brand/DEACTIVATE_BRAND_FAIL';
const GET_LOGO = 'brand/GET_LOGO';
const GET_LOGO_SUCCESS = 'brand/GET_LOGO_SUCCESS';
const GET_LOGO_FAIL = 'brand/GET_LOGO_FAIL';

export const initialState = {
    items: [],
    selectedBrand: {},
    brandId: ''
};

// Reducer

export default function brandReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_BRAND_SUCCESS:
            return {
                ...state,
                items: action.result.data
            };
        case OPEN_BRAND_SUCCESS:
            return {
                ...state,
                selectedBrand: action.result.data
            };
        case NEW_BRAND_OPEN:
            return {
                ...state,
                selectedBrand: action.brand
            };
        case CREATE_BRAND_SUCCESS:
            return {
                ...state,
                items: [... state.items.filter(i => i.id != action.result.data.id), action.result.data]
            };
        case REMOVE_BRAND_SUCCESS:
            return {
                ...state,
                items: state.items.filter(o => o.id != action.result.data)
            };
        case CHOOSE_BRAND:
            return {
                ...state,
                brandId: action.brandId
            };
        default:
            return state;
    }
}

// Actions

export function fetchBrand() {
    return {
        types: [FETCH_BRAND, FETCH_BRAND_SUCCESS, FETCH_BRAND_FAIL],
        promise: client => client.get('/api/brand/list')
    };
}

export function openBrand(id) {
    return {
        types: [OPEN_BRAND, OPEN_BRAND_SUCCESS, OPEN_BRAND_FAIL],
        promise: (client) => client.get('/api/brand/' + id),
        afterSuccess: (dispatch, getState, response) => {
            browserHistory.push('/brand/create');
        }
    }
}

export function newBrand() {
    return {
        type: NEW_BRAND_OPEN,
        brand: {
            id: '',
            name: ''
        }
    }
}

export function removeBrand(id) {
    return {
        types: [REMOVE_BRAND, REMOVE_BRAND_SUCCESS, REMOVE_BRAND_FAIL],
        promise: (client) => client.delete('/api/brand/' + id)
    }
}

export function createBrand(brand) {
    const data = new FormData();
    for (let f in brand) {
        if (brand[f] !== null)
            data.append(f, brand[f]);
    }
    return {
        types: [CREATE_BRAND, CREATE_BRAND_SUCCESS, CREATE_BRAND_FAIL],
        promise: (client) => client.post('/api/brand', data),
        afterSuccess: (dispatch, getState, response) => {
            browserHistory.push('/brand/list');
        }
    };
}

export function chooseBrand(id) {
    return {
        type: CHOOSE_BRAND,
        brandId: id
    }
}


export function activateBrand(id) {
    return {
        types: [ACTIVATE_BRAND, ACTIVATE_BRAND_SUCCESS, ACTIVATE_BRAND_FAIL],
        promise: (client) => client.put('/api/brand/activate/' + id),
        afterSuccess: (dispatch, getState, response) => {
            dispatch(fetchBrand());
        }
    }
}

export function deactivateBrand(id) {
    return {
        types: [DEACTIVATE_BRAND, DEACTIVATE_BRAND_SUCCESS, DEACTIVATE_BRAND_FAIL],
        promise: (client) => client.put('/api/brand/deactivate/' + id),
        afterSuccess: (dispatch, getState, response) => {
            dispatch(fetchBrand());
        }
    }
}

export function getLogotype(brand) {	  
	  return  {
		types: [GET_LOGO, GET_LOGO_SUCCESS, GET_LOGO_FAIL],
		promise: client => client.get('/api/brand/' + brand.id + '/logo')
	  };
}
