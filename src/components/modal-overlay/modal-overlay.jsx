import React from "react";
import {useDispatch} from "react-redux";

import modalOverlayStyle from './modal-overlay.module.css';

import {handleModalSlice} from "../services/toolkit-slices/modal";

export function ModalOverlay() {
  const dispatch = useDispatch();
  const {actions} = handleModalSlice;

  return (
    <div className={modalOverlayStyle.overlay} onClick={() => {
      dispatch(actions.handleModal_close())}}>
    </div>
  )
}
