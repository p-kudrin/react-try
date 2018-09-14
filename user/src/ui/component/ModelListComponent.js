import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import ListItem from 'component/ListItem';
import Translate from 'react-translate-component';
import NavigationBlock from 'component/NavigationBlock';

export default class ModelListComponent extends Component {
	componentWillMount() {
		const {chooseBrand, fetchModels, params} = this.props;
		chooseBrand(params.brandId);
		fetchModels(params.brandId);
	}
	
	renderThis = () => {
	var itemProps = {
			action: (id) => {			
                browserHistory.push('/brand/'+ this.props.params.brandId +'/model/' + id + '/templates');
			}
		};
    var items = this.props.items;
    var list = items.map((item) => 
			<ListItem key={item.id} item={item} {...itemProps} />);
    const navigationBlock = <NavigationBlock 
    							brand={this.props.brand} 
    							model={this.props.model} 
    							back='/brand'/>;
    return (
    	<div className="content">
			<aside className="aside">      	
				{navigationBlock}
			</aside>
			<main className="main">
      			<p><Translate content='model.hint'/></p>
      			<ul className="phone-model">
      			{list}
      			</ul>
      		</main>
      	 </div>
    );
	}
	
	render() {
		return this.props.children ? this.props.children : this.renderThis();
	}
}
