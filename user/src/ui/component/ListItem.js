import React, { Component } from 'react';

export default class ListItem extends Component {	
	onClick = (e, id) => {
		e.preventDefault();
		this.props.action(id);
	}
	
	render() {
		const {item} = this.props;
		const logoImg = this.props.item.logoFilename ?
				<img src={'data:image/png;base64, ' + item.logoEncode} /> : null;
		return (
			<li>
				<a href="" onClick={(e) => this.onClick(e, item.id)}>
                	{logoImg}
                	<p>{item.name}</p>
                </a>
            </li>
		);
	}
}