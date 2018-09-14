import SearchResultComponent from 'component/SearchResultComponent';
import {connect} from 'react-redux';
import {chooseModel} from 'reducers/model';
import {chooseBrand} from 'reducers/brand';

const mapDispatchToProps = (dispatch) => {
	  return {		  
		  chooseBrand: (id) => {
			  dispatch(chooseBrand(id))
		  },
		  chooseModel: (id) => {
			  dispatch(chooseModel(id))
		  }
	  }
}

export default connect(
  state => ({items: state.model.items,
	  brand: state.brand.brand}),
  mapDispatchToProps
)(SearchResultComponent);