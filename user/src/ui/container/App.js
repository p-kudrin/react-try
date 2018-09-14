import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import Translate from 'react-translate-component';
import translate from 'counterpart';
// import Dropdown from 'react-bootstrap-dropdown';
import {
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  PageHeader,
  Select,
  ButtonToolbar,
  DropdownButton,
  MenuItem
} from 'react-bootstrap';

import {getSession} from 'reducers/authentication';
import {setLocale} from 'reducers/locale';
import {findModels} from 'reducers/model';
import {setGuarantee} from 'reducers/template';
import {locales} from 'config/translation';
import {fetchPointsList, choosePoint} from 'reducers/points';
import SearchPanel from 'BronoComponents/SearchPanel';
import LogoutPanel from 'component/LogoutPanel';
import TradePointListComponent from 'component/TradePointListComponent';

import 'less/main.less';

const LocaleSwitcher = ({currentLocale, onLocaleChange}) => (

  <div className="language">
    <Translate content='label.locale'/>
    <div className="btn-group">
      <a className="btn btn-primary btn-sm">{currentLocale}</a>
      <a className="btn btn-primary btn-sm dropdown-toggle" data-toggle="dropdown">
        <span className="caret"/></a>
      <ul className="dropdown-menu">
        {locales.map(lang => <li key={lang}><a onClick={() => onLocaleChange(lang)}>{lang}</a></li>)}
      </ul>
    </div>
  </div>
);

const LocaleSwitcher2 = ({currentLocale, onLocaleChange}) => (
  <div className="language">
    <Translate content='label.locale'/>
    <DropdownButton bsStyle="primary" title={currentLocale} id='language'>
      {locales.map(lang => <MenuItem key={lang} active={currentLocale === lang} onClick={() => onLocaleChange(lang)}>{lang}</MenuItem>)}
    </DropdownButton>
  </div>
);

export class App extends Component {

  componentWillMount() {
    this.props.getSession();
  }

  goHome = (e) => {
    e.preventDefault();
    browserHistory.push('/');
  };

  render() {
    const {currentLocale, 
    	setLocale, 
    	findModels, 
    	fetchPointsList, 
    	choosePoint, 
    	isAuthenticated, 
    	selectedPoint, 
    	username, 
    	tradePoints} = this.props;
    const searchPanel = isAuthenticated && selectedPoint ?
      <SearchPanel doSearch={findModels} label={translate("label.search")}/> : null;
    let pointName = null;
    if (isAuthenticated && selectedPoint) {
      pointName = selectedPoint.name ? ' : ' + selectedPoint.name : <Translate content='tradePoint.label.noTradePoint'/>;
    }
    if (isAuthenticated) {
      return (

        <div className="container">

          <ul className="nav">
            <li><a href="#" onClick={this.goHome}><img src="/images/logo.png" alt="logo"/></a></li>
            <li><LogoutPanel username={username}/></li>
            <li>
              {searchPanel}
            </li>
            <li>
              <LocaleSwitcher2 currentLocale={currentLocale} onLocaleChange={setLocale}/>
            </li>
            <li>
              <div className="text-uppercase text-right">
                <div className="text-left dib">
                  <Translate content='label.support.label'/><br/>
                  <span className="text-primary"><b><Translate content='label.support.phone'/></b></span>
                </div>
              </div>
            </li>
          </ul>
          <hr/>

          {selectedPoint ? this.props.children : <TradePointListComponent 
													fetchPointsList={fetchPointsList} 
													choosePoint={choosePoint} 
													items={tradePoints}  />}
        </div>
      );
    } else {
      return (
        <div className="login">
          {this.props.children}
        </div>
      );
    }
  }
}

export default connect(
  (state, ownProps) => ({
    isAuthenticated: state.authentication.isAuthenticated,
    username: state.authentication.username,
    currentLocale: state.locale.currentLocale,
    selectedPoint: state.points.selectedPoint,
    tradePoints: state.points.items
  }),
  {getSession, setLocale, findModels, setGuarantee, fetchPointsList, choosePoint}
)(App);
