import React, {FunctionComponent} from "react";
import ReactDOM from "react-dom";

import modalStyle from "./modal.module.css";

import {ModalOverlay} from "../modal-overlay/modal-overlay";

import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {TModal} from "../../services/types/data";

const modalRoot = document.getElementById("modal");

export const Modal: FunctionComponent<TModal> = (props)=> {

  const handleEscClose = React.useCallback((evt) => {
    if (evt.key === 'Escape') {
      props.handleOnClose();
    }
  }, [props])

  React.useEffect(() => {
    // Устанавливаем слушатель события при монтировании
    document.addEventListener("keydown", handleEscClose)
    // Сбрасываем слушатель события при удалении компонента из DOM
    return () => {
      document.removeEventListener("keydown", handleEscClose)
    }
  }, [handleEscClose]) // обязательно прописать зависимости, чтобы избежать повтороного рендеринга

  if (modalRoot !== null) {
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
  } else return null // нужно для установки типа всего компонента: из него могут вернуться только либо jsx, либо null
}

// Modal.propTypes = {
//   handleOnClose: PropTypes.func.isRequired,
//   children: PropTypes.node.isRequired
// }
