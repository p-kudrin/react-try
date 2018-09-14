import React, {Component} from 'react';
import { browserHistory } from 'react-router';
import Translate from 'react-translate-component';

export default class SideMenu extends Component {
	onClick = (e, url) => {
		e.preventDefault();
		browserHistory.push(url);
	}
	
	render() {
		const items = this.props.items.map((item, key) => {
			return item.roles.includes(this.props.role) ?
			      <button key={key} className="btn btn-primary btn-lg btn-block m-b-20" onClick={(e)=>{this.onClick(e, item.link);}}>
			      	<Translate content={'menu.' + item.label}/>
	              </button>
			      : null;
			});		
		return (
			<div>				
				{items}			    
			</div>
		);
	}
}