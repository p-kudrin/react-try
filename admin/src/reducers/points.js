const FETCH_POINTS = 'points/FETCH_POINTS';
const FETCH_POINTS_SUCCESS = 'points/FETCH_POINTS_SUCCESS';
const FETCH_POINTS_FAIL = 'points/FETCH_POINTS_FAIL';
const REMOVE_POINT = 'points/REMOVE_POINT';
const REMOVE_POINT_SUCCESS = 'points/REMOVE_POINT_SUCCESS';
const REMOVE_POINT_FAIL = 'points/REMOVE_POINT_FAIL';
const RESET_POINTS = 'points/RESET_POINTS';

const ACTIVATE_POINT = 'points/ACTIVATE_POINT';
const ACTIVATE_POINT_SUCCESS = 'points/ACTIVATE_POINT_SUCCESS';
const ACTIVATE_POINT_FAIL = 'points/ACTIVATE_POINT_FAIL';

const DEACTIVATE_POINT = 'points/DEACTIVATE_POINT';
const DEACTIVATE_POINT_SUCCESS = 'points/DEACTIVATE_POINT_SUCCESS';
const DEACTIVATE_POINT_FAIL = 'points/DEACTIVATE_POINT_FAIL';

export const initialState = {
    items: [],
    selectedPoint: undefined
};

// Reducer

export default function pointsReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_POINTS:
            return {
                ...state,
                selectedOrg: action.id
            };
        case FETCH_POINTS_SUCCESS:
            return {
                ...state,
                items: action.result.data
            };
        case RESET_POINTS:
            return {
                ...state,
                items: action.data
            };
        case REMOVE_POINT_SUCCESS:
            return {
                ...state,
                items: state.items.filter(p => p.id !== action.result.data)
            };
        default:
            return state;
    }
}


export function fetchTradePoints(id) {
    if (!id)
        return {
            type: RESET_POINTS,
            data: []
        };
    else
        return {
            types: [FETCH_POINTS, FETCH_POINTS_SUCCESS, FETCH_POINTS_FAIL],
            promise: (client) => client.get('/api/org/' + id + '/points'),
            id: id
        }
}

export function removePoint(id) {
    return {
        types: [REMOVE_POINT, REMOVE_POINT_SUCCESS, REMOVE_POINT_FAIL],
        promise: (client) => client.delete('/api/points/' + id)
    }
}

export function activatePoint(id) {
    return {
        types: [ACTIVATE_POINT, ACTIVATE_POINT_SUCCESS, ACTIVATE_POINT_FAIL],
        promise: (client) => client.put('/api/points/activate/' + id),
        afterSuccess: (dispatch, getState, response) => {
            dispatch(fetchTradePoints(getState().points.selectedOrg));
        }
    }
}

export function deactivatePoint(id) {
    return {
        types: [DEACTIVATE_POINT, DEACTIVATE_POINT_SUCCESS, DEACTIVATE_POINT_FAIL],
        promise: (client) => client.put('/api/points/deactivate/' + id),
        afterSuccess: (dispatch, getState, response) => {
            dispatch(fetchTradePoints(getState().points.selectedOrg));
        }
    }
}

