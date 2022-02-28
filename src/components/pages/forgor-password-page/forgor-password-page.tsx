import React, {FunctionComponent} from "react";
import {Link, useHistory} from "react-router-dom";

import forgotPWPage from "./forgot-password-page.module.css";

import {InputDefault} from "../../input-default/input-default";
import {requestToResetPassword} from "../../../services/actions/api";

import {Button} from "@ya.praktikum/react-developer-burger-ui-components";

export const ForgotPasswordPage: FunctionComponent = () => {
  const [value, setValue] = React.useState<string>('');

  const history = useHistory();
  const redirectToChangePWPage = React.useCallback(() => {
      history.replace({pathname: '/reset-password'});
    },
    [history]
  );

  return (
    <div>
      <div className={forgotPWPage.wrapper}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <InputDefault placeholder={'Укажите e-mail'} value={value} onChange={e => setValue(e.target.value)}
                      type='email'/>
        <Button type="primary" size="medium" onClick={() => {
          requestToResetPassword(value, redirectToChangePWPage)
        }}>
          Восстановить
        </Button>
      </div>
      <div className={forgotPWPage.text}>
        <div className={forgotPWPage.textWrapper}>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
            <Link to="/login"
                  className={`text text_type_main-default text_color_inactive ${forgotPWPage.link}`}> Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
