import React, {Component} from 'react';

const initState = {
	isChecked: false
};

export default class TradePointItem extends Component {
  constructor(props) {
	  super(props);
	  this.toggleChange.bind(this);
	  this.state = {...initState, 
		isChecked: this.props.isChecked
	  };	  
  }
  toggleChange = () => {
	  this.setState({
		  isChecked: !this.state.isChecked
	  });
	  this.props.onCheck(this.props.item);
  }
  render() {
    var item = this.props.item;    
    return (
        <div className="checkbox-custom checkbox-default">
            <input type="checkbox" id={"point" + item.id} checked={this.state.isChecked} onChange={this.toggleChange}/>
            <label for={"point" + item.id}>{item.name}</label>
        </div>
    );
  }
}