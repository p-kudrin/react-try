import {connect} from 'react-redux';
import BrandEditComponent from 'component/BrandEditComponent';
import {createBrand} from 'reducers/brand';
import { browserHistory } from 'react-router';

const mapStateToProps = (state) => {
	return {
		brand: state.brand.selectedBrand
	}	
};

const mapDispatchToProps = (dispatch) => {
	return {		
		onSubmit: (data) => {
			dispatch(createBrand(data))
		},
		onCancel: () => {
			browserHistory.push('/brand');
		}
	}
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BrandEditComponent);