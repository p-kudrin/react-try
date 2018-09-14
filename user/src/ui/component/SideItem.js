import React, {Component} from 'react';
import Translate from 'react-translate-component';
import { Button } from 'react-bootstrap';

export default class SideItem extends Component {	
	onClick = (e, id) => {
		e.preventDefault();
		this.props.action(id);
	}
  
	render() {
		const { item, activeKey } = this.props;
		return (
			<li className={item.id == activeKey ? 'active' : ''}>
    			<a href="#" onClick={(e) => this.onClick(e, item.id)}>
    				<Translate content={"side.template." + item.id} />
    			</a>
    		</li>
		);
	}
}