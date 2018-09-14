import React, {Component} from 'react';
import Translate from 'react-translate-component';
import {fetchPointsList, choosePoint} from 'reducers/points';

const PointItem = (props) => {
	const {item, displayName, num, onClick} = props;
	return (
		<a href="#" className="col-xs-6 td-none" onClick={() => onClick(item.id)}>
            <div className="panel green-shadow">
                <div className="panel-body dot">
                    <div className="dot__name">{displayName}</div>
                    <div className="dot__num">{num}</div>
                </div>
            </div>
        </a>
	);
}

export default class TradePointListComponent extends Component {	
	
	componentWillMount() {
		this.props.fetchPointsList();
	}	
	
	render() {
		let items = this.props.items;
		var num = 0;
		var list = items.map((item) => {
    			num++;
				return (<PointItem key={item.id} item={item} num={num} displayName={item.name} onClick={this.props.choosePoint}/>);
    		});

    	return (
    		<div className="content content_center">
    	        <div className="choose-dot">
    	            <h1><Translate content='tradePoint.hint'/></h1>
    	            <div className="row g-25">
    	            	{list}
    	            </div>
    	        </div>
    	    </div>
    	);
	}
}
