import React, {FunctionComponent} from "react";

import modalOverlayStyle from './modal-overlay.module.css';

import {TModalOverlay} from "../../services/types/data";


export const ModalOverlay: FunctionComponent<TModalOverlay> = (props) => {
   return (
    <div className={modalOverlayStyle.overlay} onClick={() => {
      props.handleOnClose();
    }}>
    </div>
  )
}
