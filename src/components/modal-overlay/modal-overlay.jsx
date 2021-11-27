import React from "react";

import modalOverlayStyle from './modal-overlay.module.css';

export function ModalOverlay(props) {
  return (
    <div className={modalOverlayStyle.overlay} onClick={props.handleOnClose}>
    </div>
  )
}
