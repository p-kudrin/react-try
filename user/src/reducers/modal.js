const OPEN_MODAL = 'modal/OPEN_MODAL';
const CLOSE_MODAL = 'modal/CLOSE_MODAL';

// Reducer

export default function modalReducer(state={}, action) {
    switch (action.type) {
        case OPEN_MODAL:
            let toOpenId = action.id;
            state[toOpenId] = true;
            return {
                ...state
            };
        case CLOSE_MODAL:
            let toCloseId = action.id;
            state[toCloseId] = false;
            return {
                ...state
            };
        default:
            return state;
    }
}

export function openModal(id) {
    return {
        type: OPEN_MODAL,
        id: id
    }
}

export function closeModal(id) {
    return {
        type: CLOSE_MODAL,
        id: id
    }
}
