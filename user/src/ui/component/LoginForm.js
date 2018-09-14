import React, {Component} from 'react';
import {Alert, Button, Form, FormControl, FormGroup} from 'react-bootstrap';
import Translate from 'react-translate-component';
import translate from 'counterpart';

const ErrorPanel = ({messageKey}) => (
  <Alert bsStyle="danger">
    <Translate content={messageKey}/>
  </Alert>
);

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {formData: {}};

    this.onFieldChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);

  }

  onFieldChange = (e) => {
    let formData = this.state.formData;
    formData[e.target.name] = e.target.value;
    this.setState({formData});
  };

  render() {
    const {errorMessage} = this.props;
    const errorPanel = errorMessage ? <ErrorPanel messageKey={errorMessage}/> : null;
    return (

      <div className="container flex-center">
        <Form ref="form" className="width-610" onSubmit={this.handleSubmit}>
          <h1 className="text-center">
            <Translate content="login.title"/>
          </h1>
          <div className="panel">
            <div className=" panel-body">
              <div className="row form-group">
                <div className="col-xs-6">
                  <img src="/images/logo.png" alt="logo"/>
                </div>
                <div className="col-xs-6">
                  <div className="text-uppercase text-right">
                    <div className="text-left dib">
                    	<Translate content='label.support.label'/><br/>
                        <span className="text-primary"><b><Translate content='label.support.phone'/></b></span>
                    </div>
                  </div>
                </div>
              </div>

              <hr/>
              {errorPanel}

              <FormGroup className="row form-group text-center">
                <div className="col-xs-6">
                  <FormControl name="username" type="text" className="form-control"
                               placeholder={translate("login.label.login")} onChange={this.onFieldChange}/>
                </div>
                <div className="col-xs-6">
                  <FormControl name="password" type="password" className="form-control"
                               placeholder={translate("login.label.password")} onChange={this.onFieldChange}/>
                </div>
              </FormGroup>
              <br/>
              <FormGroup className="row">
                <Button type="submit" className="btn btn-primary center-block">
                  <Translate content="login.button.login"/>
                </Button>
              </FormGroup>
            </div>
          </div>
        </Form>
      </div>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    const {username, password} = this.state.formData;
    const {login} = this.props;
    login(username, password);
    return false;
  }
}

//uncomment this if need remember me case

{/*
<FormGroup className="row form-group text-center">
  <div className="col-xs-12">
    <div className="checkbox-custom checkbox-primary">
      <FormControl type="checkbox" name="remember" />
      <label htmlFor="remember" onClick={this.onClickRemember}>ЗАПОМНИТЬ МЕНЯ</label>
    </div>
  </div>
</FormGroup>*/}
