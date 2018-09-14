import React, {Component} from 'react';
import Translate from 'react-translate-component';
import SideItem from './SideItem';

export default class SideBlock extends Component {
  constructor(props) {
		super(props);
		this.list = [];
		this.activeKey = null;
  }
	
  isSideActive = (item) => {
	  return this.props.templates && this.props.templates.find(t => t.sideId == item.id) ? true : false;
  }
  
  onClick = (id) => {	
	this.activeKey = id;
	this.props.action(id);
  }
	
  render() {
    var items = this.props.items;
    const children = this.props.children;
    this.list = items
    			.filter((item) => this.isSideActive(item))
    			.map((item) => <SideItem key={item.id} item={item} action={this.onClick} activeKey={this.activeKey}/>);
    return (
    	<ul className="protect-type">
    		{this.list}
    	</ul>
    );
  }
}