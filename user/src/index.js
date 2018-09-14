import ReactDOM from 'react-dom';
import React from 'react';
import { Router, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux'


import Routes from 'router';
import { redirectToLoginWithMessage, logout } from 'reducers/authentication';
import { setupAxiosInterceptors } from 'rest/axios';
import initStore from 'config/store';
import DevTools from 'config/devtools';
import { registerLocales } from 'config/translation';

const devTools = process.env.NODE_ENV === 'development' ? <DevTools /> : null;

const store = initStore();
registerLocales(store);

const actions = bindActionCreators({redirectToLoginWithMessage, logout}, store.dispatch);
setupAxiosInterceptors(() => actions.redirectToLoginWithMessage('login.error.unauthorized'));

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <div className="rootScreen">
      {devTools}
      <Router history={history}>
        {Routes(actions.logout)}
      </Router>
    </div>
  </Provider>,
  document.getElementById('root')
);
