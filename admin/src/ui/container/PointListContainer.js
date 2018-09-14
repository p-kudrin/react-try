import {connect} from 'react-redux';
import PointListComponent from 'component/PointListComponent';
import {openOrgByPoint, fetchOrgs, chooseOrg, openOrg} from '../../reducers/orgs';
import {openModal, closeModal} from '../../reducers/modal';
import {removePoint, fetchTradePoints, activatePoint, deactivatePoint} from '../../reducers/points';

const mapStateToProps = (state) => {
    return {
        orgs: state.orgs.items,
        items: state.points.items,
        modals: state.modal
    }    
};

const mapDispatchToProps = (dispatch) => {
	  return {		  
          openPoint: (id) => {
              dispatch(openOrgByPoint(id))
          },
          newPoint: (id) => {
              dispatch(openOrg(id));
          },
          removePoint: (id) => {
              dispatch(removePoint(id))
          },
          fetchTradePoints: (id) => {
              dispatch(fetchTradePoints(id))
          },
          fetchOrgs: () => {
			  dispatch(fetchOrgs())
		  },
		  chooseOrg: (data) => {
			  dispatch(chooseOrg(data))
		  },
          onActivatePoint: (id) => {
              dispatch(activatePoint(id));
          },
          onDeactivatePoint: (id) => {
            dispatch(deactivatePoint(id));
          },
          onOpenModal: (modalID) => {
              dispatch(openModal(modalID))
          },
          onCloseModal: (modalID)=> {
              dispatch(closeModal(modalID));
          }
	  }
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PointListComponent);