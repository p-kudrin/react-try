import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import AdminItem from 'BronoComponents/AdminItem';
import Translate from 'react-translate-component';
import SideMenu from 'component/SideMenu';
import ListItem from 'component/ListItem';

export default class BrandListComponent extends Component {	
	componentWillMount() {
		const { fetchBrand } = this.props;
		fetchBrand();
	}
	
	renderThis = () => {
	var itemProps = {
		action: (id) => {			
			browserHistory.push('/brand/'+id+'/model');
		}
	}
	var items = this.props.items;
    var list = items.map((item) => 
    	<ListItem key={item.id} item={item} {...itemProps} />);
    const menuItems = [
    		{label: 'home', link: '/', roles: ['ROLE_USER', 'ROLE_ADMIN']},
    		{label: 'users', link: '/users', roles: ['ROLE_ADMIN']},
            {label: 'reports', link: '/reports', roles: ['ROLE_ADMIN']}
          ];
    const menu = <SideMenu items={menuItems} role={this.props.role}/>;

    return (
    	<div className="content">
    		<aside className="aside">
      			{menu}
      		</aside>
      		<main className="main">
      			<p><Translate content='brand.hint'/></p>
      			<ul className="brands">
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
