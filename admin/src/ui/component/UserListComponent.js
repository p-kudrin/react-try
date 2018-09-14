import React, {Component} from 'react';
import {Form, ControlLabel, FormControl, Col} from 'react-bootstrap';
import Translate from 'react-translate-component';

import Item2 from "BronoComponents/Item2";
import ItemButton, {GLYPHS, POSITIONS} from "BronoComponents/ItemButton";
import ConfirmModal from "BronoComponents/ConfirmModal";
import PointListTable from "./PointListTable";

export default class UserListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.props.fetchOrgs();
        this.props.fetchUsers(null);
    }

    onFieldChange = (e) => {
        let orgId = e.target.value === '...' ? null : e.target.value;
        this.state[e.target.name] = orgId;
        this.props.fetchUsers(orgId);
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

    render() {
        const {items, newUser, onOpenModal, openUser} = this.props;
        let orgs = new Array({id: null, name: '...'}).concat(this.props.orgs);
        let list2 = items.map((item) =>
            <Item2 key={item.id} displayName={item.email} style={item.active !== true ? "btn-secondary" : null}>

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
            </Item2>);
        return (
            <div>
                <Form horizontal>
                    <Col componentClass={ControlLabel} smOffset={2} sm={2}>
                        <Translate content="user.label.org"/>
                    </Col>
                    <Col id="organization" sm={4}>
                        <FormControl name="orgId" componentClass="select" onChange={this.onFieldChange}>
                            {orgs.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
                        </FormControl>
                    </Col>
                </Form>
                <br/><br/>
                <Col sm={12}>
                    {this.state.orgId ?
                        <Item2 key="createUser" displayName="+" onClick={() => newUser(this.state.orgId)}/>
                        : null}
                    {list2}
                </Col>
            </div>
        );
    }
}