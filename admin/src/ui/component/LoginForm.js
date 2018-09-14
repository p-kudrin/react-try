import React, { Component } from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Col, Alert, Button } from 'react-bootstrap';
import Translate from 'react-translate-component';

const ErrorPanel = ({messageKey}) => (
  <Alert bsStyle="danger">
    <Translate content={messageKey} />
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
	    this.setState({ formData });
	};

  render() {
    const {errorMessage} = this.props;
    const errorPanel = errorMessage ? <ErrorPanel messageKey={errorMessage}/> : null;
    return (
      <Col sm={12}>
      	<Col sm={12}>
		<Col sm={12}>
      		<Translate component="h3" content="login.title" />
		</Col>
		<Col sm={6}>
      			{errorPanel}
		</Col>
        </Col>

        <Form horizontal ref="form" onSubmit={this.handleSubmit}>
        	<FormGroup>
        		<Col componentClass={ControlLabel} sm={2}>
	            	<Translate content="login.label.login" />
    			</Col>
            	<Col id="username" sm={3}>
	            	<FormControl name="username" type="text" onChange={this.onFieldChange}/>
    			</Col>
        	</FormGroup>
        	<FormGroup>
	    		<Col componentClass={ControlLabel} sm={2}>
	    			<Translate content="login.label.password" />
				</Col>
		    	<Col id="password" sm={3}>
		        	<FormControl name="password" type="password" onChange={this.onFieldChange}/>
				</Col>
        	</FormGroup>

            <FormGroup>
	            <Col smOffset={2} sm={2}>
	              <Button type="submit">
	              	<Translate content="login.button.login" />
	              </Button>
	            </Col>
            </FormGroup>
        </Form>
      </Col>
    );
  }

  handleSubmit(e) {
	e.preventDefault();
    const { username, password } = this.state.formData;
    const { login } = this.props;
    login(username, password);
    return false;
  }
}
