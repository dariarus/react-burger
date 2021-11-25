import React from "react";
import ReactDOM from "react-dom";

import modalOverlayStyle from './modal-overlay.module.css';

import {Modal} from "../modal/modal.jsx";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("modal");

export function ModalOverlay(props) {
  return ReactDOM.createPortal(
    (
      <div className={modalOverlayStyle.overlay} onClick={props.handleOnClose}>
        <Modal handleOnClose={props.handleOnClose}>
          {props.children}
        </Modal>
      </div>
    ),
    modalRoot
  )
}

ModalOverlay.propTypes = {
  handleOnClose: PropTypes.func.isRequired
}
