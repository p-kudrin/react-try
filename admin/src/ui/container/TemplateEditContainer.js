import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

import TemplateEditComponent from 'component/TemplateEditComponent';
import {fetchTemplate, updateTemplate} from "../../reducers/template";

const mapStateToProps = (state) => {
    return {
        template: state.template.template || {}
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTemplate: (id) => {
            if (id) {
                if (id===0) {
                    dispatch()
                } else {
                    dispatch(fetchTemplate(id))
                }
            } else {
                browserHistory.push("/brand");

            }
        },
        onSubmit: (template, brandId, modelId) => {
            dispatch(updateTemplate(template, brandId, modelId));
        },
        onCancel: (brandId, modelId) => {
            browserHistory.push('/brand/'+brandId+'/model/'+modelId+'/template/list');
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TemplateEditComponent);