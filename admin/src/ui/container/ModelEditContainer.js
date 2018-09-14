import {connect} from 'react-redux';
import { browserHistory } from 'react-router';

import ModelEditComponent from 'component/ModelEditComponent';
import { createModel } from 'reducers/model';
import { getSides, openTemplate } from 'reducers/template'


const mapStateToProps = (state) => {
	return {
		model: state.model.selectedModel,
        templates: state.template.templates || []
	}	
};

const mapDispatchToProps = (dispatch) => {
	return {		
		onSubmit: (model) => {
			dispatch(createModel(model))
		},
		onCancel: (brandId) => {
			browserHistory.push('/brand/'+ brandId +'/model/list');
		},
        getSides: () => {
		    dispatch(getSides());
        },
        openTemplate: (brandId, modelId, templateId) => {
            browserHistory.push('/brand/'+ brandId +'/model/'+modelId+'/template/edit/'+templateId);
        },
        onActivateTemplate: () => {

        },
        onDeactivateTemplate: () => {

        }
	}
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ModelEditComponent);