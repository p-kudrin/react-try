import React, {Component} from 'react';
import Translate from 'react-translate-component';
import { Form, FormGroup, ControlLabel, FormControl, Col, Row, Button, ButtonToolbar } from 'react-bootstrap';

const defaultData = {
    formData: {
        name: ''
    }
};

export default class ModelEditComponent extends Component {

    constructor(props) {
        super(props);
        let initState = {
            formData: this.props.model
        };
        this.state = {...defaultData, ...initState};

        this.changedName.bind(this);
        this.onFileFieldChange.bind(this);
        this.onDeleteFileClick.bind(this);
        this.handleSubmit.bind(this);
        this.handleCancel.bind(this);
    }

    onFileFieldChange = (e) => {
        let formData = this.state.formData;
        formData[e.target.name] = e.target.files[0];
        this.setState({ formData });
    };

    onDeleteFileClick = (name) => {
        let formData = this.state.formData;
        formData[name] = null;
        this.setState({ formData });
    };

    changedName = (e) => {
        let formData = this.state.formData;
        formData[e.target.name] = e.target.value;
        this.setState({ formData });
    };

    validateName() {
        let length = this.state.formData.name.length;
        if (length > 0)
            return 'success';
        else
            return 'error';
    }

    validateForm = () => {
        return this.state.formData.name.length > 0;
    };

    handleSubmit = (e) => {
        if (e) {
            e.preventDefault();
        }
        if (!this.validateForm()) {
            return false;
        }
        this.props.onSubmit(this.props.model);
        return false;
    };

    handleCancel = (e) => {
        const {onCancel, params} = this.props;
        e.preventDefault();
        onCancel(params.brandId);
        return false;
    };

    render() {
        return (<Col sm={12}>
            <Form horizontal ref="form" onSubmit={this.handleSubmit}>
                <Row>
                    <Col sm={12}>
                        <FormGroup controlId="name" validationState={this.validateName()}>
                            <Col componentClass={ControlLabel} sm={1}>
                                <Translate content="model.label.name" />
                            </Col>
                            <Col sm={11}>
                                <FormControl type="text" name="name" value={this.state.formData.name} onChange={this.changedName}/>
                                <FormControl.Feedback />
                            </Col>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <ButtonToolbar className="pull-right">
                            <Button bsStyle="default" onClick={this.handleCancel}>
                                <Translate content="model.button.cancel" />
                            </Button>
                            <Button bsStyle="primary" onClick={this.handleSubmit}>
                                <Translate content="model.button.create" />
                            </Button>
                        </ButtonToolbar>
                    </Col>
                </Row>
            </Form>
        </Col>);
    }
}