import React, {Component} from 'react';
import { Table } from 'react-bootstrap';
import Translate from 'react-translate-component';

export default class PointListTable extends Component {
	
	render() {
		const 
			
			users = this.props.data.map((p, idx) => (
				      <tr key={idx}>
				        <td>{p.name}</td>
				      </tr>));
			
		const body = (
				  <Table responsive>
				    <thead>
				      <tr>
				        <th><Translate content="tradePoint.label.name" /></th>
				      </tr>
				    </thead>
				    <tbody>
				    	{users}
				    </tbody>
				  </Table>		);
		
		return body;
	}
}