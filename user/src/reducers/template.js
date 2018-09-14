import { bronoCache } from 'config/localStorage';

const SEND_TEMPLATE = 'template/SEND';
const SEND_TEMPLATE_SUCCESS = 'template/SEND_SUCCESS';
const SEND_TEMPLATE_FAIL = 'template/SEND_FAIL';
const FETCH_TEMPLATES = 'template/FETCH_TEMPLATES';
const FETCH_TEMPLATES_SUCCESS = 'template/FETCH_TEMPLATES_SUCCESS';
const FETCH_TEMPLATES_FAIL = 'template/FETCH_TEMPLATES_FAIL';
const GET_PREVIEW = 'template/GET_PREVIEW';
const GET_PREVIEW_SUCCESS = 'template/GET_PREVIEW_SUCCESS';
const GET_PREVIEW_FAIL = 'template/GET_PREVIEW_FAIL';
const CHOOSE_TEMPLATE = 'template/CHOOSE_TEMPLATE';
const SET_GUARANTEE = 'template/SET_GUARANTEE';
const CLEAR_ONPRINT = 'template/CLEAR_ONPRINT';

const initialState = {
	active: true,
	items:[],
	preview: '',
	guarantee: ''
};
// Reducer

export default function templateReducer(state = {}, action) {
  switch (action.type) {
    case SEND_TEMPLATE:
        return {
          ...state,
          errorKey: null,
          active: false
        };
    case SEND_TEMPLATE_SUCCESS:
        return {
          ...state,
          sent: true,
          active: true,
          onprint: true
        };
    case SEND_TEMPLATE_FAIL:
        return {
          ...state,
          sent: false,
          errorKey: action.error.data,
          active: true
        };
    case FETCH_TEMPLATES:
        return {
          ...state,
          items: [],
          preview: '',
          template: null,
          errorKey: null,
          onprint: null
        };
    case FETCH_TEMPLATES_SUCCESS:
        return {
          ...state,
          items: action.result.data
        };
    case GET_PREVIEW_SUCCESS:
        return {
          ...state,
          preview: action.result.data
        };
    case CHOOSE_TEMPLATE:
        return {
          ...state,
          template: action.t
        };
    case SET_GUARANTEE:
        return {
          ...state,
          guarantee: action.guarantee
        };
    case CLEAR_ONPRINT: {
      return {
        ...state,
        onprint: null
      }
    }
    default:
      return state;
  }
}

// Actions

export function fetchTemplates(id) {
	return  {
		types: [FETCH_TEMPLATES, FETCH_TEMPLATES_SUCCESS, FETCH_TEMPLATES_FAIL],
	    promise: client => client.get('/api/model/' + id + '/templates')
	};
}

export function sendTemplate(template, guarantee) {
	  return  {
		types: [SEND_TEMPLATE, SEND_TEMPLATE_SUCCESS, SEND_TEMPLATE_FAIL],
		promise: client => client.get('/api/template/' + template.id + '/print', {
			params: {
				warranty: guarantee
			}
		})
	  };
}

export function getPreview(template) {
	  return  {
		types: [GET_PREVIEW, GET_PREVIEW_SUCCESS, GET_PREVIEW_FAIL],
		promise: client => client.get('/api/template/' + template.id + '/preview', {
			params: {
				hash: template.previewHash
			},
			adapter: bronoCache.adapter
		})
	  };
}

export function chooseTemplate(t) {
	return  {
		type: CHOOSE_TEMPLATE,
		t
	};
}

export function setGuarantee(data) {
	return  {
		type: SET_GUARANTEE,
		guarantee: data.guarantee
	};
}

export function clearOnprint() {
  return {
    type: CLEAR_ONPRINT
  }
}
