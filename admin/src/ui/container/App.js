import React, { Component } from 'react';
import { connect } from 'react-redux';
import Translate from 'react-translate-component';
import { LinkContainer } from 'react-router-bootstrap';
import { Col, Nav, NavItem, Select, PageHeader, Form, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

import { getSession } from 'reducers/authentication';
import { setLocale } from 'reducers/locale';
import { locales } from 'config/translation';
import ErrorHandlerModal from './ErrorHandlerModal';

import 'stylus/main.styl';

const LocaleSwitcher = ({currentLocale, onLocaleChange}) => (
	<Form horizontal>
	  <FormGroup>
	  	  <Col componentClass={ControlLabel} className="input-sm" sm={6}>
	  		<Translate content='label.locale'/>
	  	  </Col>
	  	  <Col sm={6}>
			  <FormControl className="input-sm" componentClass="select" value={currentLocale} onChange={e => onLocaleChange(e.target.value)}>
			    {locales.map(lang => <option key={lang} value={lang}>{lang}</option>)}
			  </FormControl>
		  </Col>
	  </FormGroup>
	</Form>
);

const SideMenu = (props) => {
  const items = props.items.map((item, idx) => (
	<LinkContainer key={item.label} to={item.link}>
	    <NavItem eventKey={idx} active>
	  		<Translate component="p" content={'menu.' + item.label}/>
	    </NavItem>
    </LinkContainer>
  ));
  return (
	<Col sm={2}>
		<Nav bsStyle="pills" stacked activeKey={0}>
			{items}
	    </Nav>
	</Col>
  );
};

export class App extends Component {

  componentDidMount() {
    this.props.getSession();
  }

  render() {
    const {currentLocale, setLocale} = this.props;

    const menuItems = [
      {label: 'orgs', link: '/orgs'},
      {label: 'users', link: '/users'},
      {label: 'points', link: '/points'},
      {label: 'templates', link: '/brand'},
      {label: 'reports', link: '/reports'},
      {label: 'logout', link: '/logout'}
    ];
    const menu = this.props.isAuthenticated ? <SideMenu items={menuItems} /> : null;

    return (
      <Col sm={12}>
		<Col sm={2} className='pull-right lang-select'>
			<LocaleSwitcher currentLocale={currentLocale} onLocaleChange={setLocale} />
		</Col>

      	<PageHeader>
      		BRONO ADMIN
      	</PageHeader>

        {menu}

      	<Col smOffset={menu !== null ? 0 : 2} sm={9}>
      		{this.props.children}
      	</Col>
      	{ this.props.isAuthenticated ? <ErrorHandlerModal /> : null }
      </Col>
    );
  }
}

export default connect(
  state => ({
      isAuthenticated: state.authentication.isAuthenticated,
      currentLocale: state.locale.currentLocale
  }),
  {getSession, setLocale}
)(App);
