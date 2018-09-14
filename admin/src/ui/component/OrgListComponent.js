import React, {Component} from "react";
import {Col} from "react-bootstrap";
import Translate from "react-translate-component";

import Item2 from "../../../../../brono-components/src/Item2";
import ItemButton, {GLYPHS, POSITIONS} from "../../../../../brono-components/src/ItemButton";
import ConfirmModal from "../../../../../brono-components/src/ConfirmModal";
import UserListTable from "./UserListTable";
import PointListTable from "./PointListTable";

export default class OrgListComponent extends Component {

    componentWillMount() {
        this.props.fetchOrgs();
    }

    createUsersModal = (item) => {
        const {onCloseModal, modals} = this.props;
        return (
            <ConfirmModal bsStyle="primary" isOpen={modals ? modals["createUsers" + item.id] : false}
                          title={<Translate content="org.label.users" orgName={item.name}/>}
                          cancelLabel={<Translate content="org.button.close"/>}
                          onClose={() => onCloseModal("createUsers" + item.id)}>
                <UserListTable data={item.users}/>
            </ConfirmModal>
        );
    };

    createPointsModal = (item) => {
        const {onCloseModal, modals} = this.props;
        return (
            <ConfirmModal bsStyle="primary" isOpen={modals ? modals["createPoints" + item.id] : false}
                          title={<Translate content="org.label.points" orgName={item.name}/>}
                          cancelLabel={<Translate content="org.button.close"/>}
                          onClose={() => onCloseModal("createPoints" + item.id)}>
                <PointListTable data={item.points}/>
            </ConfirmModal>
        );
    };

    confirmDeleteModal = (id) => {
        const {onCloseModal, modals, removeOrg} = this.props;
        return (
            <ConfirmModal bsStyle="danger" isOpen={modals ? modals["removeORG" + id] : false}
                          title={<Translate content="org.confirm.deleteHeader"/>}
                          cancelLabel={<Translate content="org.button.cancel"/>}
                          confirmLabel={<Translate content="org.button.delete"/>}
                          action={() => removeOrg(id)}
                          onClose={() => onCloseModal("removeORG" + id)}>
                <Translate content="org.confirm.deleteBody"/>
            </ConfirmModal>
        );
    };

    createActiveItemButton = (item) => {
        const { onActivateORG, onDeactivateORG } = this.props;
        if(item.active === true) {
            return (
                <ItemButton glyph={GLYPHS.GLYPH_EYE_OPEN} position={POSITIONS.CENTER_BOTTOM} onClick={() => {
                    onDeactivateORG(item.id);
                }}/>
            )
        } else {
            return (
                <ItemButton glyph={GLYPHS.GLYPH_EYE_CLOSE} position={POSITIONS.CENTER_BOTTOM} onClick={() => {
                    onActivateORG(item.id);
                }}/>
            )
        }
    };

    render() {
        const {newOrg, openOrg, onOpenModal, items} = this.props;
        let list = items.map((item) =>
            <Item2 key={item.id} displayName={item.name} style={item.active !== true ? "btn-secondary" : null}>
                <ItemButton glyph={GLYPHS.GLYPH_HOME} position={POSITIONS.LEFT_TOP} glyphText={item.points.length}
                            onClick={() => {
                                onOpenModal("createPoints" + item.id)
                            }}>
                    {this.createPointsModal(item)}
                </ItemButton>
                <ItemButton glyph={GLYPHS.GLYPH_USER} position={POSITIONS.LEFT_BOTTOM} glyphText={item.users.length}
                            onClick={() => {
                                onOpenModal("createUsers" + item.id)
                            }}>
                    {this.createUsersModal(item)}
                </ItemButton>
                {this.createActiveItemButton(item)}
                <ItemButton glyph={GLYPHS.GLYPH_PENCIL} position={POSITIONS.RIGHT_TOP} onClick={() => openOrg(item.id)}/>
                <ItemButton glyph={GLYPHS.GLYPH_REMOVE} position={POSITIONS.RIGHT_BOTTOM} onClick={() => {onOpenModal("removeORG" + item.id)}}>
                    {this.confirmDeleteModal(item.id)}
                </ItemButton>
            </Item2>);

        return (
            <div>
                <Col sm={12}>
                    <Item2 key="createOrg" displayName="+" onClick={() => newOrg("new")}/>
                    {list}
                </Col>
            </div>
        );
    }
}