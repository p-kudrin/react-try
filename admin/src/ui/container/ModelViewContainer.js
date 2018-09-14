import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

import ModelViewComponent from 'component/ModelViewComponent';
import {activateTemplate, deactivateTemplate, fetchTemplates} from 'reducers/template';
import {fetchModel} from 'reducers/model';


const mapStateToProps = (state) => {
    return {
        model: state.model.selectedModel,
        templates: state.template.templates || []
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchModel: (id) => {
          dispatch(fetchModel(id));
        },
        fetchTemplates: (id) => {
            dispatch(fetchTemplates(id));
        },
        back: () => {
            browserHistory.push('/brand');
        },
        openTemplate: (brandId, modelId, templateId) => {
            browserHistory.push('/brand/' + brandId + '/model/' + modelId + '/template/edit/' + templateId);
        },
        onActivateTemplate: (modelId, templateId) => {
            dispatch(activateTemplate(modelId, templateId));
        },
        onDeactivateTemplate: (modelId, templateId) => {
            dispatch(deactivateTemplate(modelId, templateId));
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModelViewComponent);