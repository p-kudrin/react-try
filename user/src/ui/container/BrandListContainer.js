import BrandListComponent from 'component/BrandListComponent';
import {connect} from 'react-redux';
import {fetchBrand, chooseBrand} from 'reducers/brand';
import {chooseModel} from 'reducers/model';

const mapDispatchToProps = (dispatch) => {
	  return {
		  fetchBrand: () => {
			  dispatch(fetchBrand())
		  }
	  }
	}

export default connect(
  state => ({
	  items: state.brand.items,
	  role: state.authentication.role}),
  mapDispatchToProps
)(BrandListComponent);
