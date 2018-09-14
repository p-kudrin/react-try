import UserListComponent from 'component/UserListComponent';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';

import {fetchUsers, openUser, newUser, removeUser, activateUser, deactivateUser} from 'reducers/users';
import {fetchOrgs} from 'reducers/orgs';
import {openModal, closeModal} from 'reducers/modal';

const mapStateToProps = (state) => {
    return {
        items: state.users.items,
        orgs: state.orgs.items,
        modals: state.modal
    }    
};

const mapDispatchToProps = (dispatch) => {
      return {          
          fetchUsers: (id) => {
              dispatch(fetchUsers(id))
          },
          openUser: (id) => {
              dispatch(openUser(id))
          },
          newUser: (id) => {
              dispatch(newUser(id));
              browserHistory.push('createUser');
          },
          removeUser: (id) => {
              dispatch(removeUser(id))
          },
          fetchOrgs: () => {
			  dispatch(fetchOrgs())
		  },
          onOpenModal: (modalID) => {
              dispatch(openModal(modalID))
          },
          onCloseModal: (modalID) => {
              dispatch(closeModal(modalID));
          },
          onActivateUser: (id) => {
              dispatch(activateUser(id));
          },
          onDeactivateUser: (id) => {
              dispatch(deactivateUser(id));
          }
      }
    };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserListComponent);
