import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

import UserListComponent from 'component/UserListComponent';
import {fetchUsers, openUser, newUser, removeUser, activateUser, deactivateUser} from 'reducers/users';
import {openModal, closeModal} from 'reducers/modal';

const mapStateToProps = (state) => {
  return {
    items: state.users.items,
    orgId: state.authentication.organizationId,
    modals: state.modal,
	role: state.authentication.role
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
    newUser: () => {
      dispatch(newUser());
      browserHistory.push('createUser');
    },
    removeUser: (id) => {
      dispatch(removeUser(id))
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
