import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import ListItem from 'component/ListItem';
import Translate from 'react-translate-component';
import { Col } from 'react-bootstrap';
import NavigationBlock from 'component/NavigationBlock';

export default class SearchResultComponent extends Component {	
	render() {
	var itemProps = {
			action: (id) => {			
                let model = this.props.items.find(o => o.id == id);
                browserHistory.push('/brand/'+model.brandId+'/model/' + id + '/templates');
			}
		};
    var items = this.props.items;
    var list = items.map((item) => 
		<ListItem key={item.id} item={item} {...itemProps} />);
    const navigationBlock = <NavigationBlock back='/brand'/>;
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
}