import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {Col} from 'react-bootstrap';
import Translate from 'react-translate-component';

import Item2 from "../../../../../brono-components/src/Item2";
import ItemButton, {GLYPHS, POSITIONS} from "../../../../../brono-components/src/ItemButton";
import ConfirmModal from "../../../../../brono-components/src/ConfirmModal";

export default class BrandListComponent extends Component {
    componentWillMount() {
        this.props.fetchBrand();
    }

    confirmDeleteModal = (id) => {
        const {onCloseModal, modals, removeBrand} = this.props;
        return (
            <ConfirmModal bsStyle="danger" isOpen={modals ? modals["removeBrand" + id] : false}
                          title={<Translate content="brand.confirm.deleteHeader"/>}
                          cancelLabel={<Translate content="brand.button.cancel"/>}
                          confirmLabel={<Translate content="brand.button.delete"/>}
                          action={() => removeBrand(id)}
                          onClose={() => onCloseModal("removeBrand" + id)}>
                <Translate content="brand.confirm.deleteBody"/>
            </ConfirmModal>
        );
    };

    createActiveItemButton = (item) => {
        const {onActivateBrand, onDeactivateBrand} = this.props;
        if (item.active === true) {
            return (
                <ItemButton glyph={GLYPHS.GLYPH_EYE_OPEN} position={POSITIONS.CENTER_BOTTOM} onClick={() => {
                    onDeactivateBrand(item.id);
                }}/>
            )
        } else {
            return (
                <ItemButton glyph={GLYPHS.GLYPH_EYE_CLOSE} position={POSITIONS.CENTER_BOTTOM} onClick={() => {
                    onActivateBrand(item.id);
                }}/>
            )
        }
    };


    render() {
        const {items, onOpenModal, openBrand, newBrand} = this.props;

        let list = items.map((item) =>
            <Item2 key={item.id} displayName={item.name} style={item.active !== true ? "btn-secondary" : null}
                   onClick={() => {
                       this.props.chooseBrand(item.id);
                       browserHistory.push('/brand/' + item.id + '/model/list');
                   }}>
                {this.createActiveItemButton(item)}
                <ItemButton glyph={GLYPHS.GLYPH_PENCIL} position={POSITIONS.RIGHT_TOP}
                            onClick={() => openBrand(item.id)}/>
                <ItemButton glyph={GLYPHS.GLYPH_REMOVE} position={POSITIONS.RIGHT_BOTTOM} onClick={() => {
                    onOpenModal("removeBrand" + item.id)
                }}>
                    {this.confirmDeleteModal(item.id)}
                </ItemButton>
            </Item2>
        );

        return (
            <div>
                <Col sm={12}>
                    <Item2 key="createBrand" displayName="+" onClick={() => newBrand("new")}/>
                    {list}
                </Col>
            </div>
        );
    }
}
