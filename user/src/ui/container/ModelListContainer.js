import ModelListComponent from 'component/ModelListComponent';
import {connect} from 'react-redux';
import {fetchModels, chooseModel} from 'reducers/model';
import {chooseBrand} from 'reducers/brand';

const mapDispatchToProps = (dispatch) => {
	  return {
		  fetchModels: (id) => {
			  dispatch(fetchModels(id))
		  },
		  chooseBrand: (id) => {
			  dispatch(chooseBrand(id))
		  }
	  }
}

export default connect(
  state => ({items: state.model.items, 
	  brand: state.brand}),
  mapDispatchToProps
)(ModelListComponent);