import React from "react";
import {useDispatch} from "react-redux";

import modalOverlayStyle from './modal-overlay.module.css';

import {handleModalSlice} from "../../services/toolkit-slices/modal";

export function ModalOverlay(props) {
   return (
    <div className={modalOverlayStyle.overlay} onClick={() => {
      props.handleOnClose();
    }}>
    </div>
  )
}
