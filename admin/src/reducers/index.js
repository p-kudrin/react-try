import {combineReducers} from "redux";
import brand, {initialState as brandState} from "./brand";
import model, {initialState as modelState} from "./model";
import template from "./template";
import authentication, {LOGOUT_SUCCESS} from "./authentication";
import locale from "./locale";
import users, {initialState as usersState} from "./users";
import points, {initialState as pointsState} from "./points";
import reports, {initialState as reportsState} from "./reports";
import orgs, {initialState as orgsState} from "./orgs";
import errors, {initialState as errorsState} from "./errors";
import modal from "./modal";
import {routerReducer as routing} from "react-router-redux";

const appReducer = combineReducers({
    brand,
    model,
    template,
    authentication,
    locale,
    routing,
    users,
    points,
    reports,
    orgs,
    modal,
    errors
});

const initialState = {
    brand: brandState,
    model: modelState,
    users: usersState,
    points: pointsState,
    reports: reportsState,
    orgs: orgsState,
    template: {},
    authentication: {},
    errors: errorsState
};

const rootReducer = (state, action) => {
    if (action.type === LOGOUT_SUCCESS) {
        const {routing, locale} = state;
        state = {...state, ...initialState, routing, locale};
    }

    return appReducer(state, action)
};

export default rootReducer;