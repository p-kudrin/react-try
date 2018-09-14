import React, {Component} from 'react';
import Translate from 'react-translate-component';
import AddPointModalBody from './AddPointModalBody';
import {Button, ButtonToolbar, Col, ControlLabel, Form, FormControl, FormGroup, Checkbox} from 'react-bootstrap';
import {BootstrapTable, InsertModalHeader, TableHeaderColumn} from 'react-bootstrap-table';

const defaultData = {
    formData: {
        name: '',
        active: true,
        warranty: false,
        points: [],
        users: []
    }
}

export default class OrgEditComponent extends Component {

    constructor(props) {
        super(props);
        let initState = {
            formData: this.props.org
        };
        this.state = {...defaultData, ...initState};

        this.changedName.bind(this);
        this.handleSubmit.bind(this);
        this.handleCancel.bind(this);
        this.changedCheckBox.bind(this);
    }

    changedName = (e) => {
        let formData = this.state.formData;
        formData[e.target.name] = e.target.value;
        this.setState({formData});
    };

    changedCheckBox = (e) => {
        let formData = this.state.formData;
        formData[e.target.name] = e.target.checked;
        this.setState({formData});
    };

    validateName() {
        let name = this.state.formData.name;
        if (name) {
            if (name.length > 0)
                return 'success';
            else
                return 'error';
        }
    };

    validateForm = () => {
        return this.state.formData.name.length > 0;
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.validateForm()) {
            return false;
        }
        this.props.onSubmit(this.props.org);
        return false;
    };

    handleCancel = (e) => {
        e.preventDefault();
        this.props.onCancel();
        return false;
    };
    createModalBody = (columns, validateState, ignoreEditable) => {
        return (
            <AddPointModalBody columns={columns}
                               validateState={validateState}
                               ignoreEditable={ignoreEditable}/>
        );
    };
    createModalHeader = (closeModal, save) => {
        return (
            <InsertModalHeader
                title=""
                className='react-bs-table-inser-modal-header'
                onModalClose={closeModal}/>
        );
    };
    createModalFooter = (onClose, onSave) => {
        return (
            <div className='modal-footer react-bs-table-inser-modal-footer'>
		        <span>
		          <button
                      type='button'
                      className={'btn btn-default'}
                      onClick={onClose}><Translate content='org.button.cancel'/></button>
		          <button
                      type='button'
                      className={'btn btn-primary'}
                      onClick={onSave}><Translate content='org.button.create'/></button>
		        </span>
            </div>
        );
    };

    addPoint = (data) => {
        let formData = this.state.formData;
        formData.points = [...formData.points, data];
        this.setState({formData});
    };

    render() {
        let points = this.props.org.points;
        const selectRowProp = {
            mode: 'checkbox',
            bgColor: 'pink'
        };
        const cellEditProp = {
            mode: 'click',
            blurToSave: true
        };
        const options = {
            afterDeleteRow: this.props.onDeletePoint,
            handleConfirmDeleteRow: (next) => next(),
            afterInsertRow: this.addPoint,
            insertModalBody: this.createModalBody,
            insertModalHeader: this.createModalHeader,
            insertModalFooter: this.createModalFooter,
            insertText: "",
            deleteText: "",
            noDataText: <Translate content='org.label.noPoints'/>
        };
        const editable = {
            defaultValue: 'New',
            validator: (name) => {
                return name.length > 0;
            }
        };
        return (
            <div>
                <Col smOffset={2} sm={6}>
                    <Form horizontal ref="form" onSubmit={this.handleSubmit}>
                        <FormGroup controlId="name" validationState={this.validateName()}>
                            <Col componentClass={ControlLabel} sm={2}>
                                <Translate content="org.label.name"/>
                            </Col>
                            <Col sm={10}>
                                <FormControl type="text" name="name" value={this.state.formData.name}
                                             onChange={this.changedName}/>
                                <FormControl.Feedback/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="active">
                            <Col componentClass={ControlLabel} sm={2}>
                                <Translate content="org.label.active"/>
                            </Col>
                            <Col sm={10}>
                                <Checkbox name="active" checked={this.state.formData.active}
                                             onChange={this.changedCheckBox}/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="warranty">
                            <Col componentClass={ControlLabel} sm={2}>
                                <Translate content="org.label.warranty"/>
                            </Col>
                            <Col sm={10}>
                                <Checkbox name="warranty" checked={this.state.formData.warranty}
                                             onChange={this.changedCheckBox}/>
                            </Col>
                        </FormGroup>
                    </Form>
                    <BootstrapTable data={points} insertRow={true} deleteRow={true} selectRow={selectRowProp}
                                    striped={true} hover={true} options={options} cellEdit={cellEditProp}>
                        <TableHeaderColumn dataField="id" isKey hidden hiddenOnInsert autoValue={true}/>
                        <TableHeaderColumn dataField="name" editable={editable}><Translate
                            content='org.label.colPointName'/></TableHeaderColumn>
                    </BootstrapTable>
                    <br/>
                    <ButtonToolbar>
                        <Button bsStyle="default" onClick={this.handleCancel}>
                            <Translate content="org.button.cancel"/>
                        </Button>
                        <Button bsStyle="primary" onClick={this.handleSubmit}>
                            <Translate content="org.button.create"/>
                        </Button>
                    </ButtonToolbar>
                </Col>
            </div>
        );
    }
}