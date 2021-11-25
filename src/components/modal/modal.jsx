import React from "react";

import modalStyle from "./modal.module.css";

import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

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
  })

  return (
    <div className={modalStyle.modal}
         onClick={(evt) => {
           evt.stopPropagation()
         }}>
      <div className={modalStyle.cross} onClick={props.handleOnClose}>
        <CloseIcon type="primary"/>
      </div>
      {props.children}
    </div>
  )
}

Modal.propTypes = {
  handleOnClose: PropTypes.func.isRequired
}
