import {browserHistory} from 'react-router';

const OPEN_USER = 'users/OPEN_USER';
const OPEN_USER_SUCCESS = 'users/OPEN_USER_SUCCESS';
const OPEN_USER_FAIL = 'users/OPEN_USER_FAIL';
const FETCH_USER = 'users/FETCH_USER';
const FETCH_USER_SUCCESS = 'users/FETCH_USER_SUCCESS';
const FETCH_USER_FAIL = 'users/FETCH_USER_FAIL';
const CREATE_USER = 'users/CREATE_USER';
const CREATE_USER_SUCCESS = 'users/CREATE_USER_SUCCESS';
const CREATE_USER_FAIL = 'users/CREATE_USER_FAIL';
const REMOVE_USER = 'users/REMOVE_USER';
const REMOVE_USER_SUCCESS = 'users/REMOVE_USER_SUCCESS';
const REMOVE_USER_FAIL = 'users/REMOVE_USER_FAIL';
const NEW_USER_OPEN = 'users/NEW_USER_OPEN';
const RESET_USERS = 'users/RESET_USERS';

const ACTIVATE_USER = 'users/ACTIVATE_USER';
const ACTIVATE_USER_SUCCESS = 'users/ACTIVATE_USER_SUCCESS';
const ACTIVATE_USER_FAIL = 'users/ACTIVATE_POINT_FAIL';

const DEACTIVATE_USER = 'users/DEACTIVATE_USER';
const DEACTIVATE_USER_SUCCESS = 'users/DEACTIVATE_USER_SUCCESS';
const DEACTIVATE_USER_FAIL = 'users/DEACTIVATE_USER_FAIL';

export const initialState = {
    items: [],
    selectedUser: {},
    selectedOrg: null
};

// Reducer

export default function usersReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_USER:
            return {
                ...state,
                selectedOrg: action.id
            };
        case CREATE_USER_SUCCESS:
            return {
                ...state,
                items: [...state.items.filter(i => i.id != action.result.data.id), action.result.data]
            };
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                items: action.result.data
            };
        case OPEN_USER_SUCCESS:
            return {
                ...state,
                selectedUser: action.result.data
            };
        case NEW_USER_OPEN:
            return {
                ...state,
                selectedUser: action.user
            };
        case REMOVE_USER_SUCCESS:
            return {
                ...state,
                items: state.items.filter(o => o.id != action.result.data)
            };
        case RESET_USERS:
            return {
                ...state,
                items: action.data
            };
        default:
            return state;
    }
}

//Actions

export function createUser(data) {
    return {
        types: [CREATE_USER, CREATE_USER_SUCCESS, CREATE_USER_FAIL],
        promise: (client) => client.post('/api/users', data),
        afterSuccess: (dispatch, getState, response) => {
            browserHistory.push('users');
        }
    };
}

export function openUser(id) {
    return {
        types: [OPEN_USER, OPEN_USER_SUCCESS, OPEN_USER_FAIL],
        promise: (client) => client.get('/api/users/' + id),
        afterSuccess: (dispatch, getState, response) => {
            browserHistory.push('createUser');
        }
    }
}

export function removeUser(id) {
    return {
        types: [REMOVE_USER, REMOVE_USER_SUCCESS, REMOVE_USER_FAIL],
        promise: (client) => client.delete('/api/users/' + id)
    }
}

export function newUser(orgId) {
    return {
        type: NEW_USER_OPEN,
        user: {
            lastName: '',
            firstName: '',
            email: '',
            phone: '',
            password: '',
            role: 'ROLE_USER',
            organizationId: orgId,
            points: []
        }
    }
}

export function fetchUsers(id) {
    if (id === null)
        return {
            type: RESET_USERS,
            data: []
        };
    else
        return {
            types: [FETCH_USER, FETCH_USER_SUCCESS, FETCH_USER_FAIL],
            promise: (client) => client.get('/api/org/' + id + '/users'),
            afterSuccess: (dispatch, getState, response) => {
                browserHistory.push('users');
            },
            id: id
        }
}

function doFetchUsers(dispatch, getState) {
    dispatch(fetchUsers(getState().users.selectedOrg));

}

export function activateUser(id) {
    return {
        types: [ACTIVATE_USER, ACTIVATE_USER_SUCCESS, ACTIVATE_USER_FAIL],
        promise: (client) => client.put('/api/users/activate/' + id),
        afterSuccess: doFetchUsers
    }
}

export function deactivateUser(id) {
    return {
        types: [DEACTIVATE_USER, DEACTIVATE_USER_SUCCESS, DEACTIVATE_USER_FAIL],
        promise: (client) => client.put('/api/users/deactivate/' + id),
        afterSuccess: doFetchUsers
    }
}
