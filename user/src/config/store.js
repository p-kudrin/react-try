import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';

import DevTools from 'config/devtools';

import reducer from 'reducers';
import promiseMiddleware from 'config/promiseMiddleware';
import { saveState, loadState } from './localStorage';

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
      authentication: state.authentication,
      routing: state.routing,
      reports: state.reports,
      brand: state.brand,
      locale: state.locale,
      model: state.model,
      model_name: state.model_name,
      points: state.points,
      side: state.side,
      template: state.template,
      users: state.users,
    };
    saveState(toSave);
  });
  return store;
};

export default initialize;

