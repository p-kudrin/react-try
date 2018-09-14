import { browserHistory } from 'react-router';

const LOAD = 'report/LOAD';
const LOAD_SUCCESS = 'report/LOAD_SUCCESS';
const LOAD_FAIL = 'report/LOAD_FAIL';

export const initialState = {
  items: [],
  currentOrg: null
};

// Reducer

export default function reportsReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_SUCCESS:
            return {
                ...state,
                items: action.result.data,
                currentOrg: action.result.config.params.orgId
            };
        default:
            return state;
    }
}

// Actions

export function loadReport(organization, dateFrom, dateTo) {
  return  {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client => client.get('/api/reports/list', {
    	params: {
    		orgId: organization,
    		dateFrom: dateFrom,
    		dateTo: dateTo
    	}
    })
  };
}
