import React, {Component} from 'react';
import { Col } from 'react-bootstrap';
import Translate from 'react-translate-component';

import Item2 from "../../../../../brono-components/src/Item2";
import ItemButton, {GLYPHS, POSITIONS} from "../../../../../brono-components/src/ItemButton";
import ConfirmModal from "../../../../../brono-components/src/ConfirmModal";

export default class ModelListComponent extends Component {
	componentWillMount() {
		this.props.fetchModels(this.props.brandId);
	}

    confirmDeleteModal = (id) => {
        const {onCloseModal, modals, removeModel} = this.props;
        return (
			<ConfirmModal bsStyle="danger" isOpen={modals ? modals["removeModel" + id] : false}
						  title={<Translate content="model.confirm.deleteModelHeader"/>}
						  cancelLabel={<Translate content="model.button.cancel"/>}
						  confirmLabel={<Translate content="model.button.delete"/>}
						  action={() => removeModel(id)}
						  onClose={() => onCloseModal("removeModel" + id)}>
				<Translate content="model.confirm.deleteModelBody"/>
			</ConfirmModal>
        );
    };

    createActiveItemButton = (item) => {
        const { onActivateModel, onDeactivateModel } = this.props;
        if(item.active === true) {
            return (
				<ItemButton glyph={GLYPHS.GLYPH_EYE_OPEN} position={POSITIONS.CENTER_BOTTOM} onClick={() => {
                    onDeactivateModel(item.id);
                }}/>
            )
        } else {
            return (
				<ItemButton glyph={GLYPHS.GLYPH_EYE_CLOSE} position={POSITIONS.CENTER_BOTTOM} onClick={() => {
                    onActivateModel(item.id);
                }}/>
            )
        }
    };


    render() {
		const { items, brandId, newModel, openModel, onOpenModal, editModel } = this.props;

		let list = items.map((item) =>
			<Item2 key={item.id} displayName={item.name} onClick={() => openModel(item)} style={item.active !== true ? "btn-secondary" : null}>
                {this.createActiveItemButton(item)}
				<ItemButton glyph={GLYPHS.GLYPH_PENCIL} position={POSITIONS.RIGHT_TOP} onClick={() => editModel(item)}/>
				<ItemButton glyph={GLYPHS.GLYPH_REMOVE} position={POSITIONS.RIGHT_BOTTOM} onClick={() => {onOpenModal("removeModel" + item.id)}}>
                    {this.confirmDeleteModal(item.id)}
				</ItemButton>
			</Item2>);

		return (
		    <div>
		    	<Col sm={12}>
					<Item2 key="createModel" displayName="+" onClick={() => newModel(brandId)}/>
		        	{list}
		        </Col>        
		    </div>
		);
	}
}
