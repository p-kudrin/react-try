import React from "react";
import reducer from "reducers";
import {applyMiddleware, compose, createStore} from "redux";
import DevTools from "config/devtools";
import promiseMiddleware from "config/promiseMiddleware";
import {loadState, saveState} from "./localStorage";

const middlewares = process.env.NODE_ENV === 'development' ?
    [applyMiddleware(promiseMiddleware), DevTools.instrument()] :
    [applyMiddleware(promiseMiddleware)];

var initialize = (initialState = {}) => {
    const persistedState = loadState();
    const store = createStore(reducer, persistedState, compose(...middlewares));

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers');
            store.replaceReducer(nextReducer);
        });
    }
    store.subscribe(() => {
        const state = store.getState();
        const toSave = {
            brand: state.brand,
            model: state.model,
            side: state.side,
            authentication: state.authentication,
            locale: state.locale,
            routing: state.routing,
            users: state.users,
            points: state.points,
            reports: state.reports,
            orgs: state.orgs
        };
        saveState(toSave);
    });
    return store;
};

export default initialize;

