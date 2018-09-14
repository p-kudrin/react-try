import {browserHistory} from 'react-router';
import {connect} from 'react-redux';

import ModelListComponent from 'component/ModelListComponent';
import {fetchModels, selectModel, removeModel, activateModel, deactivateModel} from 'reducers/model';
import {openModal, closeModal} from 'reducers/modal';

const mapDispatchToProps = (dispatch) => {
    return {
        editModel: (model) => {
            dispatch(selectModel(model));
            browserHistory.push('/brand/'+model.brandId+'/model/edit/' + model.id);
        },
        openModel: (model) => {
            browserHistory.push('/brand/'+model.brandId+'/model/' + model.id + '/template/list');
        },
        newModel: (brandId) => {
            let emptyModel = {id: '', name: '', brandId: brandId};
            dispatch(selectModel(emptyModel));
            browserHistory.push('/brand/'+brandId+'/model/create');
        },
        removeModel: (id) => {
            dispatch(removeModel(id))
        },
        fetchModels: (id) => {
            dispatch(fetchModels(id))
        },
        onOpenModal: (modalID) => {
            dispatch(openModal(modalID))
        },
        onCloseModal: (modalID) => {
            dispatch(closeModal(modalID));
        },
        onActivateModel: (id) => {
            dispatch(activateModel(id));
        },
        onDeactivateModel: (id) => {
            dispatch(deactivateModel(id));
        }
    }
};

export default connect(
    state => ({items: state.model.items, brandId: state.brand.brandId, modals: state.modal}),
    mapDispatchToProps
)(ModelListComponent);