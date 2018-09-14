import React, {Component} from 'react';
import UserForm from 'component/UserForm';
import {connect} from 'react-redux';
import {createUser} from 'reducers/users';
import {fetchTradePoints} from 'reducers/points';
import { browserHistory } from 'react-router';

export class EditUserPage extends Component {
	componentWillMount() {
		this.props.fetchTradePoints(this.props.orgId);
	}

	render() {    
		return (
			<div>
				<UserForm {...this.props}/> 
			</div>
		);
	}
  
}

const mapStateToProps = (state) => {
	return {
		user: state.users.selectedUser,
		points: state.points.items,
		orgId: state.authentication.organizationId,
		role: state.authentication.role
	}	
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchTradePoints: (id) => {
			dispatch(fetchTradePoints(id))
		},
		onSubmit: (data) => {
			dispatch(createUser(data))
		},
		onCancel: () => {
			browserHistory.push('users');
		}
	}
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditUserPage);