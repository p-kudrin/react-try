import ChooseTemplateComponent from 'component/ChooseTemplateComponent';
import {connect} from 'react-redux';
import {chooseSide} from 'reducers/side';
import {
  sendTemplate,
  fetchTemplates,
  getPreview,
  chooseTemplate,
  clearOnprint,
  setGuarantee
} from 'reducers/template';
import {chooseBrand} from 'reducers/brand';
import {chooseModel} from 'reducers/model';
import {fetchSides} from 'reducers/side';


const mapStateToProps = (state) => {
  return {
    items: state.side.items,
    active: state.side.active,
    template: state.template,
    onprint: state.template.onprint,
    point: state.points.selectedPoint, 
	brand: state.brand,
	model: state.model,
	hasWarranty: state.authentication.hasWarranty
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    chooseSide: (id) => {
      dispatch(chooseSide(id))
    },
    sendTemplate: (t, guarranty) => {
      dispatch(sendTemplate(t, guarranty))
    },
    fetchSides: () => {
      dispatch(fetchSides())
    },
    chooseBrand: (id) => {
      dispatch(chooseBrand(id))
    },
    chooseModel: (id) => {
      dispatch(chooseModel(id))
    },
    fetchTemplates: (id) => {
      dispatch(fetchTemplates(id))
    },
    getPreview: (t) => {
      dispatch(getPreview(t))
    },
    chooseTemplate: (t) => {
      dispatch(chooseTemplate(t))
    },
    closeModal: () => {
      dispatch(clearOnprint())
    },
    setGuarantee: (data) => {
      dispatch(setGuarantee(data))
    }

  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChooseTemplateComponent);
