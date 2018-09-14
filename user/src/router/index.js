import React from 'react';
import { Route, Redirect, IndexRoute, IndexRedirect } from 'react-router';

import App from 'container/App';
import BrandListContainer from 'container/BrandListContainer';
import ModelListContainer from 'container/ModelListContainer';
import ChooseTemplateContainer from 'container/ChooseTemplateContainer';
import UserListContainer from 'container/UserListContainer';
import ReportContainer from 'container/ReportContainer';
import SearchResultContainer from 'container/SearchResultContainer';
import LoginPage from 'container/LoginPage';
import EditUserPage from 'container/EditUserPage';
import privateRoute from 'router/privateRoute';

export default (onLogout) => (
  <Route path="/" name="app" component={App}>
    <Route path="brand" component={privateRoute(BrandListContainer)}>
        <Route path=":brandId/model" component={privateRoute(ModelListContainer)}>
        	<Route path=":modelId/templates" component={privateRoute(ChooseTemplateContainer)}/>            	
        </Route>
        <Route path="models" component={privateRoute(SearchResultContainer)}/>
    </Route>    
    <Route path="users" component={privateRoute(UserListContainer)}/>
    <Route path="createUser" component={privateRoute(EditUserPage)}/>
    <Route path="reports" component={privateRoute(ReportContainer)}/>
    <Route path="login" component={LoginPage}/>
    <Route path="logout" onEnter={onLogout}/>
    <IndexRedirect to="brand"/>
  </Route>
);
