import {connect} from 'react-redux';
import { browserHistory } from 'react-router';

import OrgEditComponent from '../component/OrgEditComponent';
import {createOrg, deletePoint, addPoint} from '../../reducers/orgs';

const mapStateToProps = (state) => {
	return {
		org: state.orgs.selectedOrg
	}	
};

const mapDispatchToProps = (dispatch) => {
	return {		
		onSubmit: (data) => {
			dispatch(createOrg(data))
		},
		onCancel: () => {
			browserHistory.push('orgs');
		},
		onDeletePoint: (id) => {
			dispatch(deletePoint(id))
		},
		onAddPoint: (data) => {
            dispatch(addPoint(data))
		}
	}
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(OrgEditComponent);