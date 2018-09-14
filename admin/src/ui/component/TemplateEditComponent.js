import React, {Component} from 'react';
import Translate from "react-translate-component";
import translate from 'counterpart';
import {
    PageHeader,
    Form,
    FormGroup,
    ControlLabel,
    FormControl,
    Col,
    Row,
    Button,
    Glyphicon,
    ButtonToolbar,
    Radio
} from "react-bootstrap";

import ActionButton from 'BronoComponents/ActionButton';

const defaultData = {
    formData: {
        name: '',
        listType:'LIST_1',
        listOrientation:'ORIENTATION_1'
    }
};

export default class TemplateEditComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {...defaultData};
    }

    componentWillReceiveProps(nextProps, prevProps) {
        const {template} = nextProps;
        if (template !== prevProps.template) {
            if (template) {
                this.setState({formData: {...template}});
            }
        }
    }

    componentWillMount() {
        const {fetchTemplate, params} = this.props;
        fetchTemplate(params.templateId);
    }

    handleSubmit = (e) => {
        if (e) {
            e.preventDefault();
        }
        const {params} = this.props;
        this.props.onSubmit(this.state.formData, params.brandId, params.modelId);
        return false;
    };


    handleCancel = (e) => {
        e.preventDefault();
        const {params, onCancel} = this.props;
        onCancel(params.brandId, params.modelId);
        return false;
    };

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
    };


    onDeleteFileClick = (file, name) => {
        let formData = this.state.formData;
        formData[file] = null;
        formData[name] = null;
        this.setState({formData});
    };

    changeRadio = (value) => {
        return (e) => {
            if (e.target.value === 'on') {
                let formData = this.state.formData;
                formData[e.target.name] = value;
                this.setState({formData});
            }
        };
    };

    render() {

        const {template} = this.props;
        const hidden = {display: 'none'};
        return (
            <div>
                <PageHeader>
                    <Translate content={'side.template.' + template.sideId}/>
                </PageHeader>
                <Form horizontal ref="form" onSubmit={this.handleSubmit}>
                    <Row>
                        <Col sm={12}>
                            <FormGroup controlId="command">
                                <Col sm={4}>
                                    <FormControl type="text" readOnly
                                                 value={this.state.formData.commandFilename || translate("template.label.command")}/>
                                </Col>
                                {!this.state.formData.commandFilename ?
                                    <Col sm={3}>
                                        <label className="btn btn-primary">
                                            <Translate content="model.button.upload"/>
                                            <FormControl
                                                name="command"
                                                type="file"
                                                accept=".plt"
                                                onChange={this.onFileFieldChange}
                                                style={hidden}/>
                                        </label>
                                        <FormControl.Feedback/>
                                    </Col> :
                                    <Col sm={3}>
                                        <ActionButton confirmModal
                                                      title={<Translate
                                                          content="template.confirm.deleteCommandHeader"/>}
                                                      action={() => this.onDeleteFileClick('command', 'commandFilename')}
                                                      buttonText={<Glyphicon glyph="trash"/>} bsStyle='danger'
                                                      body={<Translate
                                                          content="template.confirm.deleteCommandTemplate"/>}
                                                      cancelLabel={<Translate content="template.button.cancel"/>}
                                                      confirmLabel={<Translate content="template.button.delete"/>}
                                        />
                                    </Col>}
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <FormGroup controlId="preview">
                                <Col sm={4}>
                                    <FormControl type="text" readOnly
                                                 value={this.state.formData.previewFilename || translate("template.label.preview")}/>
                                </Col>
                                {!this.state.formData.previewFilename ?
                                    <Col sm={3}>
                                        <label className="btn btn-primary">
                                            <Translate content="model.button.upload"/>
                                            <FormControl
                                                name="preview"
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
                                                          content="template.confirm.deletePreviewHeader"/>}
                                                      action={() => this.onDeleteFileClick('preview', 'previewFilename')}
                                                      buttonText={<Glyphicon glyph="trash"/>} bsStyle='danger'
                                                      body={<Translate
                                                          content="template.confirm.deletePreviewTemplate"/>}
                                                      cancelLabel={<Translate content="template.button.cancel"/>}
                                                      confirmLabel={<Translate content="template.button.delete"/>}
                                        />
                                    </Col>}
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col componentClass={ControlLabel} sm={4} style={{"textAlign":"left"}}>
                            <Translate content="template.label.listType"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <FormGroup controlId="listType">
                                <Radio name="listType" onClick={this.changeRadio('LIST_1')}
                                       checked={this.state.formData.listType==='LIST_1'}>
                                    <Translate content="template.radio.type.1"/>
                                </Radio>
                                <Radio name="listType" onClick={this.changeRadio('LIST_2')}
                                       checked={this.state.formData.listType==='LIST_2'}>
                                    <Translate content="template.radio.type.2"/>
                                </Radio>
                                <Radio name="listType" onClick={this.changeRadio('LIST_3')}
                                       checked={this.state.formData.listType==='LIST_3'}>
                                    <Translate content="template.radio.type.3"/>
                                </Radio>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col componentClass={ControlLabel} sm={4} style={{"textAlign":"left"}}>
                            <Translate content="template.label.listOrientation"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <FormGroup controlId="listOrientation">
                                <Radio name="listOrientation" onClick={this.changeRadio('ORIENTATION_1')}
                                       checked={this.state.formData.listOrientation==='ORIENTATION_1'}>
                                    <Translate content="template.radio.orientation.1"/>
                                </Radio>
                                <Radio name="listOrientation" onClick={this.changeRadio('ORIENTATION_2')}
                                       checked={this.state.formData.listOrientation==='ORIENTATION_2'}>
                                    <Translate content="template.radio.orientation.2"/>
                                </Radio>
                                <Radio name="listOrientation" onClick={this.changeRadio('ORIENTATION_3')}
                                    checked={this.state.formData.listOrientation==='ORIENTATION_3'}>
                                 	<Translate content="template.radio.orientation.3"/>
                                </Radio>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={2}/>
                        <Col sm={10}>
                            <ButtonToolbar className="pull-left">
                                <Button bsStyle="default" onClick={this.handleCancel}>
                                    <Translate content="model.button.cancel"/>
                                </Button>
                                <Button bsStyle="primary" onClick={this.handleSubmit}><Translate
                                    content="model.button.create"/></Button>
                            </ButtonToolbar>
                        </Col>
                    </Row>
                </Form>
            </div>

        );
    }
}