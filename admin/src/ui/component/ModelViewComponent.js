import React, {Component} from 'react';
import PropTypes from "prop-types";
import Translate from 'react-translate-component';
import {Col, PageHeader, Row} from 'react-bootstrap';

import Item2 from "BronoComponents/Item2";
import ItemButton, {GLYPHS, POSITIONS} from "BronoComponents/ItemButton";


export default class ModelViewComponent extends Component {

    componentWillMount() {
        const {fetchTemplates, fetchModel, back, params} = this.props;
        if (params.modelId) {
            fetchTemplates(params.modelId);
            fetchModel(params.modelId);
        } else {
            back();
        }
    }

    render() {
        const {model, templates, openTemplate, onActivateTemplate, onDeactivateTemplate, params} = this.props;
        const list = templates ? templates.map((item) =>
            <Item2 key={item.sideId} style={item.active !== true ? "btn-secondary" : null}
                   displayName={<Translate content={"side.template." + item.sideId}/>}
                   onClick={() => openTemplate(params.brandId, params.modelId, item.id)}>
                {
                    item.active === true ?
                        <ItemButton glyph={GLYPHS.GLYPH_EYE_OPEN}
                                    position={POSITIONS.CENTER_BOTTOM}
                                    onClick={() => {
                                        onDeactivateTemplate(params.modelId, item.id);
                                    }}/>
                        :
                        <ItemButton glyph={GLYPHS.GLYPH_EYE_CLOSE}
                                    position={POSITIONS.CENTER_BOTTOM}
                                    onClick={() => {
                                        onActivateTemplate(params.modelId, item.id);
                                    }}/>
                }
                <ItemButton glyph={GLYPHS.GLYPH_PENCIL} position={POSITIONS.RIGHT_TOP}
                            onClick={() => openTemplate(params.brandId, params.modelId, item.id)}/>
            </Item2>) : null;
        return (
            <Col sm={12}>
                <Row>
                    <Col sm={12}>
                        <PageHeader>
                            {model.name}
                        </PageHeader>
                    </Col>
                </Row>
                <Row>
                    {list}
                </Row>
            </Col>);
    }
}

ModelViewComponent.propTypes = {
    templates: PropTypes.array,
    openTemplate: PropTypes.func,
    getSides: PropTypes.func,
    onActivateTemplate: PropTypes.func,
    onDeactivateTemplate: PropTypes.func

};