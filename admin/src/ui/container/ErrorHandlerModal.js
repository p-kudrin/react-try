import React, {Component} from 'react';
import {connect} from 'react-redux';
import Translate from 'react-translate-component';

import {clearError} from "reducers/errors";
import ConfirmModal from "BronoComponents/ConfirmModal";

class ErrorHandlerModal extends Component {
  componentWillMount() {
	  this.props.clearError();
  }
  render() {
    const {isError, clearError, message, code} = this.props;
    return (
      <ConfirmModal bsStyle="danger" isOpen={isError}
                    title={<Translate content="errorHandler.title"/>}
                    cancelLabel={<Translate content="errorHandler.buttonCancel"/>}
                    onClose={clearError}>
        <Translate content="errorHandler.body" details={message}/>
        {code ? <Translate content="errorHandler.code" code={code}/> : null}
      </ConfirmModal>
    )
  }
}

export default connect(
  state => ({
    message: state.errors.message,
    isError: state.errors.isError,
    code: state.errors.code
  }),
  {clearError}
)(ErrorHandlerModal);
