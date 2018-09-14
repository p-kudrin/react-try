import {browserHistory} from "react-router";

const FETCH_ORGS = 'orgs/FETCH_ORGS';
const FETCH_ORGS_SUCCESS = 'orgs/FETCH_ORGS_SUCCESS';
const FETCH_ORGS_FAIL = 'orgs/FETCH_ORGS_FAIL';
const OPEN_ORG = 'orgs/OPEN_ORG';
const OPEN_ORG_SUCCESS = 'orgs/OPEN_ORG_SUCCESS';
const OPEN_ORG_FAIL = 'orgs/OPEN_ORG_FAIL';
const NEW_ORG_OPEN = 'orgs/NEW_ORG_OPEN';
const CREATE_ORG = 'orgs/CREATE_ORG';
const CREATE_ORG_SUCCESS = 'orgs/CREATE_ORG_SUCCESS';
const CREATE_ORG_FAIL = 'orgs/CREATE_ORG_FAIL';
const REMOVE_ORG = 'orgs/REMOVE_ORG';
const REMOVE_ORG_SUCCESS = 'orgs/REMOVE_ORG_SUCCESS';
const REMOVE_ORG_FAIL = 'orgs/REMOVE_ORG_FAIL';
const DELETE_POINT = 'orgs/DELETE_POINT';
const ADD_POINT = 'orgs/ADD_POINT';
const ACTIVATE_ORG = 'orgs/ACTIVATE_ORG';
const ACTIVATE_ORG_SUCCESS = 'orgs/ACTIVATE_ORG_SUCCESS';
const ACTIVATE_ORG_FAIL = 'orgs/ACTIVATE_ORG_FAIL';
const DEACTIVATE_ORG = 'orgs/DEACTIVATE_ORG';
const DEACTIVATE_ORG_SUCCESS = 'orgs/DEACTIVATE_ORG_SUCCESS';
const DEACTIVATE_ORG_FAIL = 'orgs/DEACTIVATE_ORG_FAIL';

export const initialState = {
    items: [],
    selectedOrg: {}
};

// Reducer

export default function orgsReducer(state = initialState, action) {
    let items = state.items;
    switch (action.type) {
        case FETCH_ORGS_SUCCESS:
            return {
                ...state,
                items: action.result.data
            };
        case OPEN_ORG_SUCCESS:
            return {
                ...state,
                selectedOrg: action.result.data
            };
        case NEW_ORG_OPEN:
            return {
                ...state,
                selectedOrg: action.org
            };
        case ADD_POINT:
            return {
                ...state,
                selectedOrg: {...state.selectedOrg, points: [...state.selectedOrg.points, action.point]}
            };
        case DELETE_POINT:
            let ids = action.pointIds;
            return {
                ...state,
                selectedOrg: {...state.selectedOrg, points: state.selectedOrg.points.filter(p => !ids.includes(p.id))}
            };
        case CREATE_ORG_SUCCESS:
            return {
                ...state,
                items: [...state.items.filter(o => o.id !== action.result.data.id), action.result.data]
            };
        case REMOVE_ORG_SUCCESS:
            return {
                ...state,
                items: items.filter(o => o.id !== action.result.data)
            };
        default:
            return state;
    }
}

export function fetchOrgs() {
    return {
        types: [FETCH_ORGS, FETCH_ORGS_SUCCESS, FETCH_ORGS_FAIL],
        promise: (client) => client.get('/api/org/list')
    }
}

export function openOrg(id) {
    return {
        types: [OPEN_ORG, OPEN_ORG_SUCCESS, OPEN_ORG_FAIL],
        promise: (client) => client.get('/api/org/' + id),
        afterSuccess: (dispatch, getState, response) => {
            browserHistory.push('createOrg');
        }
    }
}

export function openOrgByPoint(id) {
    return {
        types: [OPEN_ORG, OPEN_ORG_SUCCESS, OPEN_ORG_FAIL],
        promise: (client) => client.get('/api/points/' + id + '/org'),
        afterSuccess: (dispatch, getState, response) => {
            browserHistory.push('createOrg');
        }
    }
}

export function newOrg() {
    return {
        type: NEW_ORG_OPEN,
        org: {
            id: '',
            name: '',
            points: [],
            users: []
        }
    }
}

export function removeOrg(id) {
    return {
        types: [REMOVE_ORG, REMOVE_ORG_SUCCESS, REMOVE_ORG_FAIL],
        promise: (client) => client.delete('/api/org/' + id)
    }
}

export function createOrg(data) {
    return {
        types: [CREATE_ORG, CREATE_ORG_SUCCESS, CREATE_ORG_FAIL],
        promise: (client) => client.post('/api/org', data),
        afterSuccess: (dispatch, getState, response) => {
            browserHistory.push('orgs');
        }
    };
}

export function deletePoint(ids) {
    return {
        type: DELETE_POINT,
        pointIds: ids
    }
}

export function addPoint(data) {
    return {
        type: ADD_POINT,
        point: data
    }
}

export function activateORG(id) {
    return {
        types: [ACTIVATE_ORG, ACTIVATE_ORG_SUCCESS, ACTIVATE_ORG_FAIL],
        promise: (client) => client.put('/api/org/activate/' + id),
        afterSuccess: (dispatch, getState, response) => {
            dispatch(fetchOrgs());
        }
    }
}

export function deactivateORG(id) {
    return {
        types: [DEACTIVATE_ORG, DEACTIVATE_ORG_SUCCESS, DEACTIVATE_ORG_FAIL],
        promise: (client) => client.put('/api/org/deactivate/' + id),
        afterSuccess: (dispatch, getState, response) => {
            dispatch(fetchOrgs());
        }
    }
}