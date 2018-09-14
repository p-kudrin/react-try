import React, {Component} from 'react';
import {Form, FormGroup, ControlLabel, FormControl, Col, Button, InputGroup, ButtonToolbar, Well} from 'react-bootstrap';
import TradePointItem from './TradePointItem';
import Translate from 'react-translate-component';
import SideMenu from 'component/SideMenu';

const defaultData = {
		formData: {
			lastName: '',
			firstName: '',
			email: '',
			phone: '',
			password: '',
			role: 'ROLE_USER',
			organizationId: '',
			points:[],
			orgId: ''
		},
		points: []
}

export default class UserForm extends Component {
	constructor(props) {
		super(props);
		let initState = {
			formData: this.props.user,
			points: this.props.points,
			orgId: this.props.orgId
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
        this.state.formData['organizationId'] = this.state.orgId;
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
	    const menuItems = [
    		{label: 'home', link: '/brand', roles: ['ROLE_USER', 'ROLE_ADMIN']},
    		{label: 'users', link: '/users', roles: ['ROLE_ADMIN']},
            {label: 'reports', link: '/reports', roles: ['ROLE_ADMIN']}
          ];
	    const menu = <SideMenu items={menuItems} role={this.props.role}/>;		
		return (
			<div className="content">
    			<aside className="aside">
    				{menu}
    			</aside>
    			<main className="main">
    				<div className="row g-35">
    					<div className="col-xs-6 vborder">
    						<h1 className="m-b-35"><Translate content="user.label.info" /></h1>
    						<Form horizontal onSubmit={this.onSubmit}>				
    						<FormGroup controlId="lastName" validationState={this.validateLastname()}>
    							<Col componentClass={ControlLabel} sm={3}>
    								<Translate component="p" content="user.label.lastName" />
    							</Col>
    							<Col sm={9}>
    								<FormControl name="lastName" type="text" value={this.state.formData.lastName} onChange={this.changedField}/>
    								<FormControl.Feedback />
    							</Col>
    						</FormGroup>
    						
    						<FormGroup controlId="firstName" validationState={this.validateName()}>
    							<Col componentClass={ControlLabel} sm={3}>
    								<Translate component="p" content="user.label.name" />
    							</Col>
    							<Col sm={9}>
    							<FormControl name="firstName" type="text" value={this.state.formData.firstName} onChange={this.changedField}/>
    							<FormControl.Feedback />
    							</Col>
    						</FormGroup>
    						
    						<FormGroup controlId="email" validationState={this.validateEmail()}>
    							<Col componentClass={ControlLabel} sm={3}>
    								<Translate component="p" content="user.label.email" />
    							</Col>
    							<Col sm={9}>
    								<FormControl name="email" type="text" value={this.state.formData.email} onChange={this.changedField}/>
    								<FormControl.Feedback />
    							</Col>
    						</FormGroup>
    						
    						<FormGroup controlId="phone" validationState={this.validatePhone()}>
    						<Col componentClass={ControlLabel} sm={3}>
    							<Translate component="p" content="user.label.phone" />
    						</Col>
    						<Col sm={9}>
    							<FormControl name="phone" type="text" value={this.state.formData.phone} onChange={this.changedField}/>
    							<FormControl.Feedback />
    						</Col>
    						</FormGroup>
    						
    						<FormGroup controlId="password" validationState={this.validatePass()}>
    						<Col componentClass={ControlLabel} sm={3}>
    							<Translate component="p" content="user.label.password" />
    						</Col>
    						<Col sm={9}>
    							<FormControl name="password" type="text" value={this.state.formData.password} onChange={this.changedField}/>
    							<FormControl.Feedback />
    						</Col>
    						</FormGroup>
    						
    						<FormGroup controlId="role">
    						<Col componentClass={ControlLabel} sm={3}>
    							<Translate component="p" content="user.label.role" />
    						</Col>
    						<Col sm={9}>
    							<a href="#"><label className="control-label text-left"><Translate content={"user.roles." + this.state.formData.role}/></label></a>
    						</Col>
    						</FormGroup>

                            <div className="form-group">
                            <div className="col-xs-offset-2 col-xs-10 col-lg-offset-3 col-lg-9">
                                <div className="row">
                                    <div className="col-xs-6">
                                        <button className="btn btn-danger btn-block btn-lg" onClick={this.handleCancel}>
                                        	<Translate content="user.button.cancel" />
                                        </button>
                                    </div>
                                    <div className="col-xs-6">
                                        <button type="submit" className="btn btn-primary btn-block btn-lg">
                                        	<Translate content="user.button.create" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            </div>
    		        		</Form>
    					</div>
    					<div className="col-xs-6">
    						<h2 className="m-b-35"><Translate content="user.label.points" /></h2>
    						<div className="trade-dot">
    						{pointsList}
    						</div>
    					</div>
    				</div>
    			</main>
			</div>			
		);
	}
}