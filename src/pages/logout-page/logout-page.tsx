import React, {FunctionComponent} from "react";
import logoutPage from "./logout-page.module.css";

import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {logout} from "../../services/actions/api";
import {useAppDispatch} from "../../services/types/hooks";

export const LogoutPage: FunctionComponent = () => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <div className={logoutPage.wrapper}>
        <h2 className="text text_type_main-medium">Выйти из профиля?</h2>
        <div className={logoutPage.buttons}>
          <Button type="secondary" size="medium" onClick={() => {
            dispatch(logout());
          }}>
            Да
          </Button>
          <Button type="primary" size="medium" onClick={() => {
            window.history.back();
          }}>
            Нет
          </Button>
        </div>
      </div>
    </div>
  )
}
