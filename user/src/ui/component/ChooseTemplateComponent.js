import React, {Component} from 'react';
import SideBlock from './SideBlock';
import InfoBlock from './InfoBlock';
import Translate from 'react-translate-component';
import ConfirmModal from 'BronoComponents/ConfirmModal';
import NavigationBlock from 'component/NavigationBlock';
import GuaranteeBlock from 'component/GuaranteeBlock';
import Modal from "react-modal";

export default class ChooseTemplateComponent extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {chooseBrand, chooseModel, fetchSides, fetchTemplates, chooseSide, params} = this.props;
    chooseModel(params.modelId);
    chooseSide(undefined);
    fetchSides();
    fetchTemplates(params.modelId);
  }

  sendTemplate = (e) => {
    e.preventDefault();
    if (this.isTemplateChoosen()) {
      this.props.sendTemplate(this.props.template.template, this.props.template.guarantee);
    }
  };

  isTemplateChoosen = () => {
    return this.props.template && this.props.template.template;
  };

  onChooseSide = (id) => {
    this.props.chooseSide(id);
    let template = this.props.template.items.find(t => t.sideId == id);
    this.props.chooseTemplate(template);
    this.props.getPreview(template);
  };

  renderPopup() {
    return (
     <Modal className='col-lg-4 col-sm-8 confirm' isOpen={this.props.onprint} onRequestClose={this.props.closeModal}>
    	<div className="modal-content">
    		<div className="modal-header">
    			<button type="button" className="close" onClick={this.props.closeModal}><span aria-hidden="true">&times;</span></button>
    		</div>
    		<div className="modal-body text-center">
          		<h2 className="m-b-30"><Translate content="printPopup.title"/></h2>
          		<img src="/images/logo-round-big.png" alt="logo" className="m-b-20"/>
          		<p className="fz-18"><Translate content="printPopup.text"/></p>
    		</div>
    	</div>
 	 </Modal>
 	);
  }

  render() {
    const {items, template, onprint, setGuarantee, hasWarranty, params } = this.props;
    const navigationBlock = <NavigationBlock 
    							brand={this.props.brand}     							
    							model={this.props.model} 
    							back={'/brand/' + params.brandId + '/model'}/>;
    const guaranteeBlock = hasWarranty ? <GuaranteeBlock action={setGuarantee}/> : null;

    return (
      <div className="content">
      	<aside className="aside">
      		{navigationBlock}
      		{guaranteeBlock}
      	</aside>
      	<main className="main">
      		<div className="row g-35">
      			<div className="col-xs-6 vborder">
      				<h1 className="m-b-45"><Translate content="side.hint1"/></h1>
      				<div className="row">
      					<div className="col-xs-7 col-lg-6">
      						<SideBlock items={items} action={this.onChooseSide} templates={template.items}/>
                        </div>
      					<div className="col-xs-5 col-lg-6">
      						{this.props.active && this.props.template.preview != '' ? <img src={'data:image/png;base64, ' + this.props.template.preview} className="img-responsive pull-right"/> : null}
      					</div>
      				</div>
      			</div>
      			<div className="col-xs-6">
      				<InfoBlock template={template.template}/>
      				<button className="btn btn-xl btn-primary" onClick={this.sendTemplate} disabled={!this.isTemplateChoosen()}>
      					<Translate content="side.label.print"/>
      				</button>
      			</div>
      		</div>      		
      		{template.errorKey ? <p className="alert alert-danger"><Translate content={template.errorKey}/></p> : null}      		
      		{onprint===true?this.renderPopup():null}
        </main>
      </div>
    );
  }
}
