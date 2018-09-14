import {connect} from 'react-redux';
import { browserHistory } from 'react-router';

import {fetchOrgs, openOrg, newOrg, removeOrg, activateORG, deactivateORG} from '../../reducers/orgs';
import {openModal, closeModal} from '../../reducers/modal';
import OrgListComponent from '../component/OrgListComponent';

const mapStateToProps = (state) => {
    return {
        items: state.orgs.items,
        modals: state.modal
    }    
};

const mapDispatchToProps = (dispatch) => {
      return {          
          fetchOrgs: () => {
              dispatch(fetchOrgs())
          },
          openOrg: (id) => {
              dispatch(openOrg(id))
          },
          newOrg: () => {
              dispatch(newOrg());
              browserHistory.push('createOrg');
          },
          removeOrg: (id) => {
              dispatch(removeOrg(id))
          },
          onOpenModal: (modalID) => {
              dispatch(openModal(modalID))
          },
          onCloseModal: (modalID)=> {
              dispatch(closeModal(modalID));
          },
          onActivateORG: (id) => {
              dispatch(activateORG(id));
          },
          onDeactivateORG: (id) => {
              dispatch(deactivateORG(id));
          }
      }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrgListComponent);
