import React from "react";

import modalOverlayStyle from './modal-overlay.module.css';
import PropTypes from "prop-types";

export function ModalOverlay(props) {
   return (
    <div className={modalOverlayStyle.overlay} onClick={() => {
      props.handleOnClose();
    }}>
    </div>
  )
}

ModalOverlay.propTypes = {
  handleOnClose: PropTypes.func.isRequired
}
