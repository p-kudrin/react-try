import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

import BrandListComponent from '../component/BrandListComponent';
import {fetchBrand, openBrand, newBrand, removeBrand, chooseBrand, activateBrand, deactivateBrand} from '../../reducers/brand';
import {openModal, closeModal} from '../../reducers/modal';

const mapDispatchToProps = (dispatch) => {
    return {
        fetchBrand: () => {
            dispatch(fetchBrand())
        },
        fetchModel: (id) => {
            dispatch(fetchModel(id))
        },
        openBrand: (id) => {
            dispatch(openBrand(id))
        },
        newBrand: () => {
            dispatch(newBrand());
            browserHistory.push('/brand/create');
        },
        removeBrand: (id) => {
            dispatch(removeBrand(id))
        },
        chooseBrand: (id) => {
            dispatch(chooseBrand(id))
        },
        onOpenModal: (modalID) => {
            dispatch(openModal(modalID))
        },
        onCloseModal: (modalID) => {
            dispatch(closeModal(modalID));
        },
        onActivateBrand: (id) => {
            dispatch(activateBrand(id));
        },
        onDeactivateBrand: (id) => {
            dispatch(deactivateBrand(id));
        }
    }
};

export default connect(
    state => ({items: state.brand.items, modals: state.modal}),
    mapDispatchToProps
)(BrandListComponent);
