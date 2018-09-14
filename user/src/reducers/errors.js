const CLEAR_ERROR = 'errors/CLEAR_ERROR';
const SHOW_ERROR = 'errors/SHOW_ERROR';

export const initialState = {
    isError: false
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CLEAR_ERROR:
            return {
                isError: false,
                message: null,
                code: null
            };
        case SHOW_ERROR:
            return {
                isError: true,
                message: action.message,
                code: action.code
            };
        default:
            return state;
    }
}

export function clearError() {
    return {
        type: CLEAR_ERROR
    }
}

export function showError(message, code) {
    return {
        type: SHOW_ERROR,
        message,
        code
    }
}
