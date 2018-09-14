import { browserHistory } from 'react-router';

const GET_SIDES = 'template/GET_SIDES';
const GET_SIDES_SUCCESS = 'template/GET_SIDES_SUCCESS';
const GET_SIDES_FAIL = 'template/GET_SIDES_FAIL';

const FETCH_TEMPLATE = 'template/FETCH_TEMPLATE';
const FETCH_TEMPLATE_SUCCESS = 'template/FETCH_TEMPLATE_SUCCESS';
const FETCH_TEMPLATE_FAIL = 'template/FETCH_TEMPLATE_FAIL';

const FETCH_TEMPLATES = 'template/FETCH_TEMPLATES';
const FETCH_TEMPLATES_SUCCESS = 'template/FETCH_TEMPLATES_SUCCESS';
const FETCH_TEMPLATES_FAIL = 'template/FETCH_TEMPLATES_FAIL';

const ACTIVATE_TEMPLATE = 'template/ACTIVATE_TEMPLATE';
const ACTIVATE_TEMPLATE_SUCCESS = 'template/ACTIVATE_TEMPLATE_SUCCESS';
const ACTIVATE_TEMPLATE_FAIL = 'template/ACTIVATE_TEMPLATE_FAIL';

const DEACTIVATE_TEMPLATE = 'template/DEACTIVATE_TEMPLATE';
const DEACTIVATE_TEMPLATE_SUCCESS = 'template/DEACTIVATE_TEMPLATE_SUCCESS';
const DEACTIVATE_TEMPLATE_FAIL = 'template/DEACTIVATE_TEMPLATE_FAIL';

const UPDATE_TEMPLATE = 'template/UPDATE_TEMPLATE';
const UPDATE_TEMPLATE_SUCCESS = 'template/UPDATE_TEMPLATE_SUCCESS';
const UPDATE_TEMPLATE_FAIL = 'template/UPDATE_TEMPLATE_FAIL';

// Reducer

export default function chooseReducer(state = {}, action) {
    switch (action.type) {
        case GET_SIDES_SUCCESS:
            return {
                ...state,
                sides: action.result.data,
            };
        case FETCH_TEMPLATE_SUCCESS:
            return {
                ...state,
                template: action.result.data
            };
        case FETCH_TEMPLATES_SUCCESS:
            return {
                ...state,
                templates: action.result.data
            };
        default:
            return state;
    }
}

// Actions

export function getSides() {
    return {
        types: [GET_SIDES, GET_SIDES_SUCCESS, GET_SIDES_FAIL],
        promise: client => client.get('/api/template/sides')
    }
}

export function fetchTemplate(id) {
    return {
        types: [FETCH_TEMPLATE, FETCH_TEMPLATE_SUCCESS, FETCH_TEMPLATE_FAIL],
        promise: client => client.get('/api/template/details/' + id)
    }
}

export function fetchTemplates(modelId) {
    return {
        types: [FETCH_TEMPLATES, FETCH_TEMPLATES_SUCCESS, FETCH_TEMPLATES_FAIL],
        promise: client => client.get('/api/template/list/' + modelId)
    }
}

export function updateTemplate(template, brandId, modelId) {
    const data = new FormData();
    for (let f in template) {
        if (template[f] !== null)
            data.append(f, template[f]);
    }
    return  {
        types: [UPDATE_TEMPLATE, UPDATE_TEMPLATE_SUCCESS, UPDATE_TEMPLATE_FAIL],
        promise: (client) => client.post('/api/template', data),
        afterSuccess: (dispatch, getState, response) => {
            browserHistory.push('/brand/'+brandId+'/model/'+modelId+'/template/list');
        }
    };

}

export function activateTemplate(modelId, templateId) {
    return {
        types: [ACTIVATE_TEMPLATE, ACTIVATE_TEMPLATE_SUCCESS, ACTIVATE_TEMPLATE_FAIL],
        promise: (client) => client.put('/api/template/activate/' + templateId),
        afterSuccess: (dispatch, getState, response) => {
            dispatch(fetchTemplates(modelId));
        }
    }
}

export function deactivateTemplate(modelId, templateId) {
    return {
        types: [DEACTIVATE_TEMPLATE, DEACTIVATE_TEMPLATE_SUCCESS, DEACTIVATE_TEMPLATE_FAIL],
        promise: (client) => client.put('/api/template/deactivate/' + templateId),
        afterSuccess: (dispatch, getState, response) => {
            dispatch(fetchTemplates(modelId));
        }
    }
}