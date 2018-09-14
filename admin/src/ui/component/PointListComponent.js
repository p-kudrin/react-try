import React, { Component } from 'react';
import { Form, ControlLabel, FormControl, Col } from 'react-bootstrap';
import Translate from 'react-translate-component';

import UserListTable from './UserListTable';
import Item2 from "../../../../../brono-components/src/Item2";
import ItemButton, {GLYPHS, POSITIONS} from "../../../../../brono-components/src/ItemButton";
import ConfirmModal from "../../../../../brono-components/src/ConfirmModal";

export default class PointListComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentWillMount() {
		this.props.fetchOrgs();
		this.props.fetchTradePoints(null);
	}

	onFieldChange = (e) => {
		let orgId = e.target.value  === '...' ? null : e.target.value;
		this.state[e.target.name] = orgId;
		this.props.fetchTradePoints(orgId);
	};

	copyToClipboard = (id)=> {
		let token = this.props.items.find(x => x.id === id).token;
	    if (window.clipboardData && window.clipboardData.setData) {
	        // IE specific code path to prevent textarea being shown while dialog is visible.
	        return clipboardData.setData("token", token);

	    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
	        var textarea = document.createElement("textarea");
	        textarea.textContent = token;
	        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
	        document.body.appendChild(textarea);
	        textarea.select();
	        try {
	            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
	        } catch (ex) {
	            console.warn("Copy to clipboard failed.", ex);
	            return false;
	        } finally {
	            document.body.removeChild(textarea);
	        }
	    }
	};

	createUsersModal = (item) => {
        const {onCloseModal, modals} = this.props;
        return (
			<ConfirmModal bsStyle="primary" isOpen={modals ? modals["createUsers" + item.id] : false}
						  title={<Translate content="point.label.users" pointName={item.name}/>}
						  cancelLabel={<Translate content="org.button.close"/>}
						  onClose={() => onCloseModal("createUsers" + item.id)}>
				<UserListTable data={item.users}/>
			</ConfirmModal>
        );
    };

    confirmDeleteModal = (id) => {
        const {onCloseModal, modals, removePoint} = this.props;
        return (
			<ConfirmModal bsStyle="danger" isOpen={modals ? modals["removePoint" + id] : false}
						  title={<Translate content="point.confirm.deleteHeader"/>}
						  cancelLabel={<Translate content="point.button.cancel"/>}
						  confirmLabel={<Translate content="point.button.delete"/>}
						  action={() => removePoint(id)}
						  onClose={() => onCloseModal("removePoint" + id)}>
				<Translate content="point.confirm.deleteBody"/>
			</ConfirmModal>
        );
    };

    createActiveItemButton = (item) => {
        const { onActivatePoint, onDeactivatePoint } = this.props;
        if(item.active === true) {
            return (
				<ItemButton glyph={GLYPHS.GLYPH_EYE_OPEN} position={POSITIONS.CENTER_BOTTOM} onClick={() => {
                    onDeactivatePoint(item.id);
                }}/>
            )
        } else {
            return (
				<ItemButton glyph={GLYPHS.GLYPH_EYE_CLOSE} position={POSITIONS.CENTER_BOTTOM} onClick={() => {
                    onActivatePoint(item.id);
                }}/>
            )
        }
    };

	render() {
		const {onOpenModal, openPoint, orgs, newPoint} = this.props;

		let renderOrgs = new Array({id: null, name: '...'}).concat(orgs);
		let items = this.props.items;
		let list = items.map((item) =>
			<Item2 key={item.id} displayName={item.name} style={item.active !== true ? "btn-secondary" : null}>
				<ItemButton glyph={GLYPHS.GLYPH_USER} position={POSITIONS.LEFT_BOTTOM} glyphText={item.users.length}
							onClick={() => {
                                onOpenModal("createUsers" + item.id)
                            }}>
                    {this.createUsersModal(item)}
				</ItemButton>
				<ItemButton glyph={GLYPHS.GLYPH_EXCL_SIGN} position={POSITIONS.LEFT_TOP} onClick={() => this.copyToClipboard(item.id)}/>
				<ItemButton glyph={GLYPHS.GLYPH_PENCIL} position={POSITIONS.RIGHT_TOP} onClick={() => openPoint(item.id)}/>
                {this.createActiveItemButton(item)}
				<ItemButton glyph={GLYPHS.GLYPH_REMOVE} position={POSITIONS.RIGHT_BOTTOM} onClick={() => {onOpenModal("removePoint" + item.id)}}>
                    {this.confirmDeleteModal(item.id)}
				</ItemButton>
			</Item2>);

    return (
      <div>
      	<Form horizontal>
		<Col componentClass={ControlLabel} smOffset={2} sm={2}>
    		<Translate content="point.label.org" />
    	</Col>
    	<Col id="organization" sm={4}>
			<FormControl name="orgId" componentClass="select" onChange={this.onFieldChange}>
		    	{renderOrgs.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
		    </FormControl>
		</Col>
		</Form>
		<br/><br/>
        <Col sm={12}>
        	{ this.state.orgId ?
                <Item2 key="createPoint" displayName="+" onClick={() => newPoint(this.state.orgId)}/>
                : null }
			{list}
        </Col>
      </div>
    );
  }
}
