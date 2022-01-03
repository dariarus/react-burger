import React from "react";
import ReactDOM from "react-dom";
import {useDispatch} from "react-redux";
import PropTypes from "prop-types";

import modalStyle from "./modal.module.css";

import {ModalOverlay} from "../modal-overlay/modal-overlay.jsx";

import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("modal");

export function Modal(props) {

  function handleEscClose(evt) {
    if (evt.key === 'Escape') {
      props.handleOnClose();
    }
  }

  React.useEffect(() => {
    // Устанавливаем слушатель события при монтировании
    document.addEventListener("keydown", handleEscClose)
    // Сбрасываем слушатель события при удалении компонента из DOM
    return () => {
      document.removeEventListener("keydown", handleEscClose)
    }
  }, []) // обязательно прописать зависимости, чтобы избежать повтороного рендеринга

  return ReactDOM.createPortal(
    (
      <>
        <ModalOverlay handleOnClose={props.handleOnClose}/>
        
        <div className={modalStyle.modal} onClick={(evt) => {
          evt.stopPropagation()
        }}>
          <div className={modalStyle.cross} onClick={() => {
            props.handleOnClose();
          }}>
            <CloseIcon type="primary"/>
          </div>
          {props.children}
        </div>
      </>
    ),
    modalRoot
  )
}

Modal.propTypes = {
  handleOnClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}
