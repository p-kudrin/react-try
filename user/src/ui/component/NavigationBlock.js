import React, {Component} from 'react';
import { browserHistory } from 'react-router';
import Translate from 'react-translate-component';
import { Col, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const BrandLink = (props) => {
	const {brand, onClick} = props;
	let url = '/brand/' + brand.id + '/model';
	const logoImg = brand.logoFilename ? <img src={'data:image/png;base64, ' + brand.logoEncode} /> : null;
	return (
        <li>
        	<a href="#" onClick={(e)=>{onClick(e, url);}} className="thumb active">
            	<i className="icon-left-big"></i>
            	{logoImg}
            	<p>{brand.name}</p>
            </a>
        </li>
	);
};
const ModelLink = (props) => {
	return (
        <li>
        	<a href="#" className="thumb thumb_no-image">
            	<p>{props.model.name}</p>
            </a>
        </li>
	);
}

export default class NavigationBlock extends Component {
	goBack = () => {
		browserHistory.push(this.props.back);
	}
	
	onClick = (e, url) => {
		e.preventDefault();
		browserHistory.push(url);
	}
	
	render() {
		let {brand, model} = this.props;
		let selectedBrand = brand ? brand.items.find(o => o.id == brand.brandId) : null;
		let selectedModel = model ? model.items.find(o => o.id == model.modelId) : null;
		let brandLink = selectedBrand ? <BrandLink brand={selectedBrand} onClick={this.onClick}/> : null;
		let modelLink = selectedModel ? <ModelLink model={selectedModel} onClick={(e) => e.preventDefault()}/> : null;
		return (			
			<div>
            	<button className="btn btn-primary btn-lg btn-block" onClick={this.goBack}>
            		<i className="icon-left-big"></i>
            		<Translate content='menu.back'/>
            	</button>
                <ul className="list-unstyled min-height-195">
					{brandLink}
					{modelLink}
                </ul>                
			</div>
		);
	}
}

