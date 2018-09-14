import React from 'react';
import {Route, IndexRoute, IndexRedirect} from 'react-router';

import App from '../ui/container/App';
import BrandListContainer from '../ui/container/BrandListContainer';
import ModelListContainer from '../ui/container/ModelListContainer';
import UserListContainer from '../ui/container/UserListContainer';
import ReportContainer from '../ui/container/ReportContainer';
import OrgListContainer from '../ui/container/OrgListContainer';
import OrgEditContainer from '../ui/container/OrgEditContainer';
import BrandEditContainer from '../ui/container/BrandEditContainer';
import ModelEditContainer from '../ui/container/ModelEditContainer';
import PointListContainer from '../ui/container/PointListContainer';
import LoginPage from '../ui/container/LoginPage';
import EditUserPage from '../ui/container/EditUserPage';
import privateRoute from './privateRoute';
import TemplateEditContainer from "../ui/container/TemplateEditContainer";
import ModelViewContainer from "../ui/container/ModelViewContainer";

export default (onLogout) => (
    <Route path="/" name="app" component={App}>
        <IndexRoute component={privateRoute(OrgListContainer)}/>
        <Route path="brand">
            <Route path="list" component={privateRoute(BrandListContainer)}/>
            <Route path="create" component={privateRoute(BrandEditContainer)}/>
            <Route path=":brandId/model">
                <Route path="list" component={privateRoute(ModelListContainer)}/>
                <Route path="create" component={privateRoute(ModelEditContainer)}/>
                <Route path="edit/:modelId" component={privateRoute(ModelEditContainer)}/>
                <Route path=":modelId/template">
                    <Route path="list" component={privateRoute(ModelViewContainer)}/>
                    <Route path="edit/:templateId" component={privateRoute(TemplateEditContainer)}/>
                    <IndexRedirect to="list"/>
                </Route>
                <IndexRedirect to="list"/>
            </Route>
            <IndexRedirect to="list"/>
        </Route>
        <Route path="orgs" component={privateRoute(OrgListContainer)}/>
        <Route path="points" component={privateRoute(PointListContainer)}/>
        <Route path="users" component={privateRoute(UserListContainer)}/>
        <Route path="createUser" component={privateRoute(EditUserPage)}/>
        <Route path="createOrg" component={privateRoute(OrgEditContainer)}/>
        <Route path="reports" component={privateRoute(ReportContainer)}/>
        <Route path="login" component={LoginPage}/>
        <Route path="logout" onEnter={onLogout}/>
    </Route>
);
