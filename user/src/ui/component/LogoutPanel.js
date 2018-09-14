import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import Translate from 'react-translate-component';
import { Col } from 'react-bootstrap';

export default class LogoutPanel extends Component {
  logout = (e) => {
	  e.preventDefault();
	  browserHistory.push('/logout');
  };

  render() {
	  const username = this.props.username;
	  return (
      <div>
        <p className="username">{username}</p>
        <a href="#" onClick={this.logout}><Translate content="menu.logout"/></a>
      </div>
	  );
  }
}
