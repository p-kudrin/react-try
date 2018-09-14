import React, {Component} from 'react';
import { Table } from 'react-bootstrap';
import Translate from 'react-translate-component';

export default class UserListTable extends Component {
	
	render() {
		const 
			
			users = this.props.data.map((u, idx) => (
				      <tr key={idx}>
				        <td><strong>{u.email}</strong></td>
				        <td>{u.firstName}</td>
				        <td>{u.lastName}</td>
				      </tr>));
			
		const body = (
				  <Table responsive>
				    <thead>
				      <tr>
				        <th><Translate content="user.label.email" /></th>
				        <th><Translate content="user.label.name" /></th>
				        <th><Translate content="user.label.lastName" /></th>
				      </tr>
				    </thead>
				    <tbody>
				    	{users}
				    </tbody>
				  </Table>		);
		
		return body;
	}
}