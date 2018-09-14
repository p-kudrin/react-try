import { combineReducers } from 'redux';
import brand, { initialState as brandState} from './brand';
import model, {initialState as modelState } from './model';
import side, {initialState as sideState } from './side';
import template from './template';
import authentication from './authentication';
import locale from './locale';
import users, {initialState as usersState } from './users';
import reports, {initialState as reportsState} from "./reports";
import points, {initialState as pointsState} from './points';
import { routerReducer as routing } from 'react-router-redux';
import  {LOGOUT_SUCCESS, LOGIN} from './authentication';
import errors, {initialState as errorsState} from './errors';
import modal from './modal';

const appReducer = combineReducers({
  brand,
  model,
  side,
  template,
  authentication,
  locale,
  routing,
  users,
  reports,
  points,
  errors,
  modal
});

const initialState = {
	brand: brandState,
	model: modelState,
	side: sideState,
	users: usersState,
	reports: reportsState,
	points: pointsState,
	template: {},
	authentication: {},
	errors: errorsState
};


const rootReducer =  (state, action) => {
	if (action.type === LOGOUT_SUCCESS || action.type === LOGIN) {
		const { routing, locale } = state;
		state = {... state, ...initialState, routing, locale };
	}

	return appReducer(state, action)
};

export default rootReducer;
