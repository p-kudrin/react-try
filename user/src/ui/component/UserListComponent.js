import React, {Component} from 'react';
import Translate from 'react-translate-component';
import { Col } from 'react-bootstrap';

import Item2 from 'BronoComponents/Item2';
import ItemButton, {GLYPHS, POSITIONS} from "BronoComponents/ItemButton";
import ConfirmModal from "BronoComponents/ConfirmModal";

import AdminItem from 'BronoComponents/AdminItem';
import {ConfirmModalBody} from 'BronoComponents/ConfirmModalBody';

import PointListTable from './PointListTable';
import SideMenu from 'component/SideMenu';

export default class UserListComponent extends Component {
	componentWillMount() {
		this.props.fetchUsers(this.props.orgId);
	}

  createPointsModal = (item) => {
    const {onCloseModal, modals} = this.props;
    function normalizeName(item) {
      return (item.firstName ? item.firstName : '') + ' ' + (item.lastName ? item.lastName : '');
    }
    return (
      <ConfirmModal bsStyle="primary" isOpen={modals ? modals["pointsForUser" + item.id] : false}
                    title={<Translate content="user.label.points" userName={normalizeName(item)}/>}
                    cancelLabel={<Translate content="user.button.close"/>}
                    onClose={() => onCloseModal("pointsForUser" + item.id)}>
        <PointListTable data={item.points}/>
      </ConfirmModal>
    );
  };


  createActiveItemButton = (item) => {
    const {onActivateUser, onDeactivateUser} = this.props;
    if (item.active === true) {
      return (
        <ItemButton glyph={GLYPHS.GLYPH_EYE_OPEN} position={POSITIONS.CENTER_BOTTOM} onClick={() => {
          onDeactivateUser(item.id);
        }}/>
      )
    } else {
      return (
        <ItemButton glyph={GLYPHS.GLYPH_EYE_CLOSE} position={POSITIONS.CENTER_BOTTOM} onClick={() => {
          onActivateUser(item.id);
        }}/>
      )
    }
  };

  confirmDeleteModal = (id) => {
    const {onCloseModal, modals, removeUser} = this.props;
    return (
      <ConfirmModal bsStyle="danger" isOpen={modals ? modals["removeUser" + id] : false}
                    title={<Translate content="user.confirm.deleteHeader"/>}
                    cancelLabel={<Translate content="user.button.cancel"/>}
                    confirmLabel={<Translate content="user.button.delete"/>}
                    action={() => removeUser(id)}
                    onClose={() => onCloseModal("removeUser" + id)}>
        <Translate content="user.confirm.deleteBody"/>
      </ConfirmModal>
    );
  };

	render() {
    const {items, newUser, onOpenModal, openUser} = this.props;
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
				<div className="row g-35">
					<div className="col-xs-12">
			          <AdminItem key="createUser" item={{id: "new"}} displayName="+" mainAction={newUser} />
			          {items.map((item) =>
			            <Item2 key={item.id} displayName={item.email}>

			            <ItemButton glyph={GLYPHS.GLYPH_HOME}
			                        position={POSITIONS.LEFT_TOP}
			                        glyphText={item.points.length}
			                        onClick={() => {
			                          onOpenModal("pointsForUser" + item.id)
			                        }}>
			              {this.createPointsModal(item)}
			            </ItemButton>

			            <ItemButton glyph={GLYPHS.GLYPH_PENCIL}
			                        position={POSITIONS.RIGHT_TOP}
			                        onClick={() => openUser(item.id)}/>

			            {this.createActiveItemButton(item)}

			            <ItemButton glyph={GLYPHS.GLYPH_REMOVE}
			                        position={POSITIONS.RIGHT_BOTTOM}
			                        onClick={() => {
			                          onOpenModal("removeUser" + item.id)
			                        }}>
			              {this.confirmDeleteModal(item.id)}
			            </ItemButton>
			          </Item2>
			          )}
					</div>
				</div>
			</main>
		</div>
    );
  }
}
