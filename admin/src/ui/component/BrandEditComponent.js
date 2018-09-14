import React, {Component} from 'react';
import Translate from 'react-translate-component';
import translate from 'counterpart';
import { Form, FormGroup, ControlLabel, FormControl, Col, Button, ButtonToolbar, Row, Glyphicon } from 'react-bootstrap';
import ActionButton from 'BronoComponents/ActionButton';

const defaultData = {
		formData: {
			name: ''
		}
}

export default class BrandEditComponent extends Component {
	
	constructor(props) {
		super(props);
		let initState = {
				formData: this.props.brand
		};
		this.state = {...defaultData, ...initState};
		
		this.changedName.bind(this);
		this.handleSubmit.bind(this);
		this.handleCancel.bind(this);
	}
	
	changedName = (e) => {
		let formData = this.state.formData;
		formData[e.target.name] = e.target.value;
	    this.setState({ formData });
	}
	
	validateForm = () => {
		return this.state.formData.name.length > 0;
	}
	
	validateName() {
		let length = this.state.formData.name.length;
		if (length > 0) 
			return 'success';
		else 
			return 'error';
	}
	handleSubmit = (e) => {
		e.preventDefault();
		if (!this.validateForm()) {
			return false;
		}
		this.props.onSubmit(this.props.brand);
		return false;
	}
	
	handleCancel = (e) => {
		e.preventDefault();		
		this.props.onCancel();
		return false;
	}
	
    onFileFieldChange = (e) => {
        let formData = this.state.formData;
        let file = e.target.files[0];
        if (file) {
            formData[e.target.name + 'Filename'] = file.name;
        } else {
            formData[e.target.name + 'Filename'] = null;
        }
        formData[e.target.name] = file;
        this.setState({formData});
    }
    
    onDeleteFileClick = (file, name) => {
        let formData = this.state.formData;
        formData[file] = null;
        formData[name] = null;
        this.setState({formData});
    }
    
	render() {
		const hidden = {display: 'none'};
		return (<Col smOffset={2} sm={6}>
        	<Form horizontal ref="form" onSubmit={this.handleSubmit}>
        		<FormGroup controlId="name" validationState={this.validateName()}>
        		<Row>
        			<Col componentClass={ControlLabel} sm={2}>
        				<Translate content="brand.label.name" />
        			</Col>
        			<Col sm={10}>
        				<FormControl type="text" name="name" value={this.state.formData.name} onChange={this.changedName}/>
        				<FormControl.Feedback />
        			</Col>
                </Row>
        		<Row>
    				<Col componentClass={ControlLabel} sm={2}>
    					<Translate content="brand.label.logo" />
    				</Col>
                    <Col sm={10}>
                        <FormGroup controlId="logo">
                            <Col sm={6}>
                                <FormControl type="text" readOnly
                                             value={this.state.formData.logoFilename || translate("brand.label.preview")}/>
                            </Col>
                            {!this.state.formData.logoFilename ?
                                <Col sm={3}>
                                    <label className="btn btn-primary">
                                        <Translate content="model.button.upload"/>
                                        <FormControl
                                            name="logo"
                                            type="file"
                                            accept=".png"
                                            onChange={this.onFileFieldChange}
                                            style={hidden}/>
                                    </label>
                                    <FormControl.Feedback/>
                                </Col> :
                                <Col sm={1}>
                                    <ActionButton confirmModal
                                                  title={<Translate
                                                      content="brand.confirm.deleteLogoHeader"/>}
                                                  action={() => this.onDeleteFileClick('logo', 'logoFilename')}
                                                  buttonText={<Glyphicon glyph="trash"/>} bsStyle='danger'
                                                  body={<Translate
                                                      content="brand.confirm.deleteLogoTemplate"/>}
                                                  cancelLabel={<Translate content="brand.button.cancel"/>}
                                                  confirmLabel={<Translate content="brand.button.delete"/>}
                                    />
                                </Col>}
                        </FormGroup>
                    </Col>
                </Row>
        		</FormGroup>        		
        	</Form>     
        	
        	<ButtonToolbar>
				<Button bsStyle="default" onClick={this.handleCancel}>
					<Translate content="brand.button.cancel" />
				</Button>
				<Button bsStyle="primary" onClick={this.handleSubmit}>
					<Translate content="brand.button.create" />
				</Button>		        
			</ButtonToolbar>
		</Col>);
	}
}