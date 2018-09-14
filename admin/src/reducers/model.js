import {browserHistory} from 'react-router';

const FETCH_MODELS = 'model/FETCH_MODELS';
const FETCH_MODELS_SUCCESS = 'model/FETCH_MODELS_SUCCESS';
const FETCH_MODELS_FAIL = 'model/FETCH_MODELS_FAIL';

const FETCH_MODEL = 'model/FETCH_MODEL';
const FETCH_MODEL_SUCCESS = 'model/FETCH_MODEL_SUCCESS';
const FETCH_MODEL_FAIL = 'model/FETCH_MODEL_FAIL';

const SELECT_MODEL = 'model/SELECT_MODEL';

const CREATE_MODEL = 'model/CREATE_MODEL';
const CREATE_MODEL_SUCCESS = 'model/CREATE_MODEL_SUCCESS';
const CREATE_MODEL_FAIL = 'model/CREATE_MODEL_FAIL';

const REMOVE_MODEL = 'model/REMOVE_MODEL';
const REMOVE_MODEL_SUCCESS = 'model/REMOVE_MODEL_SUCCESS';
const REMOVE_MODEL_FAIL = 'model/REMOVE_MODEL_FAIL';

const ACTIVATE_MODEL = 'model/ACTIVATE_MODEL';
const ACTIVATE_MODEL_SUCCESS = 'model/ACTIVATE_MODEL_SUCCESS';
const ACTIVATE_MODEL_FAIL = 'model/ACTIVATE_MODEL_FAIL';

const DEACTIVATE_MODEL = 'model/DEACTIVATE_MODEL';
const DEACTIVATE_MODEL_SUCCESS = 'model/DEACTIVATE_MODEL_SUCCESS';
const DEACTIVATE_MODEL_FAIL = 'model/DEACTIVATE_MODEL_FAIL';


export const initialState = {
    items: [],
    selectedModel: {},
    selectedBrand: null,
    templates: [{id:1, name:"name"}]
};

// Reducer

export default function modelReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_MODELS_SUCCESS:
            return {
                ...state,
                items: action.result.data
            };
        case FETCH_MODELS:
            return {
                ...state,
                selectedBrand: action.id,
                items: []
            };
        case FETCH_MODEL_SUCCESS:
            return {
                ...state,
                selectedModel: action.result.data
            };
        case SELECT_MODEL:
            return {
                ...state,
                selectedModel: action.model
            };
        case CREATE_MODEL_SUCCESS:
            return {
                ...state,
                items: [... state.items.filter(i => i.id !== action.result.data.id), action.result.data]
            };
        case REMOVE_MODEL_SUCCESS:
            return {
                ...state,
                items: state.items.filter(o => o.id !== action.result.data)
            };
        default:
            return state;
    }
}

// Actions

export function fetchModels(id) {
    return {
        types: [FETCH_MODELS, FETCH_MODELS_SUCCESS, FETCH_MODELS_FAIL],
        promise: client => client.get('/api/brand/' + id + '/models'),
        id: id
    };
}

export function fetchModel(id) {
    return {
        types: [FETCH_MODEL, FETCH_MODEL_SUCCESS, FETCH_MODEL_FAIL],
        promise: (client) => client.get('/api/model/' + id)
    }
}

export function selectModel(model) {
    return {
        type: SELECT_MODEL,
        model: model
    }
}

export function removeModel(id) {
    return {
        types: [REMOVE_MODEL, REMOVE_MODEL_SUCCESS, REMOVE_MODEL_FAIL],
        promise: (client) => client.delete('/api/model/' + id)
    }
}

export function createModel(model) {
    return {
        types: [CREATE_MODEL, CREATE_MODEL_SUCCESS, CREATE_MODEL_FAIL],
        promise: (client) => client.post('/api/model', model),
        afterSuccess: () => {
            browserHistory.push('/brand/'+model.brandId+'/model/list');
        }
    };
}

function doFetchModels(dispatch, getState) {
    dispatch(fetchModels(getState().model.selectedBrand));
}

export function activateModel(id) {
    return {
        types: [ACTIVATE_MODEL, ACTIVATE_MODEL_SUCCESS, ACTIVATE_MODEL_FAIL],
        promise: (client) => client.put('/api/model/activate/' + id),
        afterSuccess: doFetchModels
    }
}

export function deactivateModel(id) {
    return {
        types: [DEACTIVATE_MODEL, DEACTIVATE_MODEL_SUCCESS, DEACTIVATE_MODEL_FAIL],
        promise: (client) => client.put('/api/model/deactivate/' + id),
        afterSuccess: doFetchModels
    }
}
