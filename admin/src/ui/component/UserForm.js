import React, {Component} from 'react';
import {Form, FormGroup, ControlLabel, FormControl, Col, Button, InputGroup, ButtonToolbar, Well} from 'react-bootstrap';
import TradePointItem from 'BronoComponents/TradePointItem';
import Translate from 'react-translate-component';

const defaultData = {
		formData: {
			lastName: '',
			firstName: '',
			email: '',
			phone: '',
			password: '',
			role: 'ROLE_USER',
			organizationId: '',
			points:[]
		},
		points: []
}

export default class UserForm extends Component {
	constructor(props) {
		super(props);
		let initState = {
			formData: this.props.user,
			points: this.props.points
		};
		this.state = {...defaultData, ...initState};
		
		Object.keys(this.state.formData).forEach((key) => {
			if (this.state.formData[key] == null) this.state.formData[key] = '';
		});		
	}
	
	onSubmit = (evt) => {
		evt.preventDefault();
		if (!this.validateForm()) {
			return false;
		}		
		this.props.onSubmit(this.state.formData);
		return false;
	}
	
	handleCancel = (e) => {
		e.preventDefault();		
		this.props.onCancel();
		return false;
	}
	
	validationState(length) {
		if (length > 0) return 'success';
		else return 'error';
	}
	
	validateForm = () => {
		return this.state.formData.lastName.length > 0 &&
	           this.state.formData.firstName.length > 0 &&
	           this.state.formData.email.length > 0 &&
	           this.state.formData.phone.length > 0 &&
	           this.state.formData.password.length > 0;
	}
	
	changedField = (e) => {
		let formData = this.state.formData;
		formData[e.target.name] = e.target.value;
	    this.setState({ formData });
	}
	
	validateLastname() {
		return this.validationState(this.state.formData.lastName.length);
	}
	
	validateName() {
		return this.validationState(this.state.formData.firstName.length);
	}
	
	validateEmail() {
		return this.validationState(this.state.formData.email.length);
	}
	
	validatePhone() {
		return this.validationState(this.state.formData.phone.length);
	}
	
	validatePass() {
		return this.validationState(this.state.formData.password.length);
	}
	onCheckPoint = (item) => {
		let exist = this.state.formData.points.find(p => p.id === item.id);
		if (exist) {
			this.state.formData.points = this.state.formData.points.filter(p => p.id != item.id);
		} else {
			this.state.formData.points.push(item);
		}
	}
	isChecked = (id) => {
		return this.state.formData.points.find(p => p.id === id) ? true : false;
	}
	
	render() {
		let item = this.props.user;
		let pointsList = this.props.points.map((item) => (
				<TradePointItem key={item.id} item={item} onCheck={this.onCheckPoint} isChecked={this.isChecked(item.id)}/>
				));
		return (
			<div>
			<Col smOffset={1} sm={6}>
			<Translate component="p" content="user.label.info" />
			</Col>
			<Col smOffset={1} sm={4}>
			<Translate component="p" content="user.label.points" />
			</Col>
			<Col sm={7}>
			<Well>
			<Form horizontal onSubmit={this.onSubmit}>				
				<FormGroup controlId="lastName" validationState={this.validateLastname()}>
					<Col componentClass={ControlLabel} sm={3}>
						<Translate component="p" content="user.label.lastName" />
					</Col>
					<Col sm={6}>
						<FormControl name="lastName" type="text" value={this.state.formData.lastName} onChange={this.changedField}/>
						<FormControl.Feedback />
					</Col>
				</FormGroup>
				
				<FormGroup controlId="firstName" validationState={this.validateName()}>
					<Col componentClass={ControlLabel} sm={3}>
						<Translate component="p" content="user.label.name" />
					</Col>
					<Col sm={6}>
					<FormControl name="firstName" type="text" value={this.state.formData.firstName} onChange={this.changedField}/>
					<FormControl.Feedback />
					</Col>
				</FormGroup>
				
				<FormGroup controlId="email" validationState={this.validateEmail()}>
					<Col componentClass={ControlLabel} sm={3}>
						<Translate component="p" content="user.label.email" />
					</Col>
					<Col sm={6}>
						<FormControl name="email" type="text" value={this.state.formData.email} onChange={this.changedField}/>
						<FormControl.Feedback />
					</Col>
				</FormGroup>
				
				<FormGroup controlId="phone" validationState={this.validatePhone()}>
				<Col componentClass={ControlLabel} sm={3}>
					<Translate component="p" content="user.label.phone" />
				</Col>
				<Col sm={6}>
					<FormControl name="phone" type="text" value={this.state.formData.phone} onChange={this.changedField}/>
					<FormControl.Feedback />
				</Col>
				</FormGroup>
				
				<FormGroup controlId="password" validationState={this.validatePass()}>
				<Col componentClass={ControlLabel} sm={3}>
					<Translate component="p" content="user.label.password" />
				</Col>
				<Col sm={6}>
					<FormControl name="password" type="text" value={this.state.formData.password} onChange={this.changedField}/>
					<FormControl.Feedback />
				</Col>
				</FormGroup>
				
				<FormGroup controlId="role">
				<Col componentClass={ControlLabel} sm={3}>
					<Translate component="p" content="user.label.role" />
				</Col>
				<Col sm={6}>
					<FormControl name="role" componentClass="select" value={this.state.formData.role} onChange={this.changedField}>
						<option value="ROLE_USER"><Translate component="p" content="user.roles.user" /></option>
						<option value="ROLE_ADMIN"><Translate component="p" content="user.roles.admin" /></option>
					</FormControl>
				</Col>
				</FormGroup>

			    <FormGroup>
		        <ButtonToolbar>
		        	<Col smOffset={2}>
  					<Button bsStyle="default" onClick={this.handleCancel}>
  						<Translate content="user.button.cancel" />
  					</Button>
  					<Button bsStyle="primary" type="submit">
  						<Translate content="user.button.create" />
  					</Button>
  					</Col>
        		</ButtonToolbar>
        		</FormGroup>			
			</Form>
			</Well>
			</Col>
			<Col sm={5}>
				<Col sm={10}>
				{pointsList}
				</Col>
			</Col>
			</div>
		);
	}
}