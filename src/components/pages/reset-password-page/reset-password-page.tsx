import React, {FunctionComponent} from "react";
import {Link} from "react-router-dom";

import resetPWPage from "./reset-password-page.module.css";

import {changePassword} from "../../../services/actions/api";

import {InputDefault} from "../../input-default/input-default";

import {Button} from "@ya.praktikum/react-developer-burger-ui-components";

export const ResetPasswordPage: FunctionComponent = () => {
  const [password, setPassword] = React.useState<string>('');
  const [code, setCode] = React.useState<string>('');
  const typePassword = 'password';

  return (
    <div>
      <div className={resetPWPage.wrapper}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <InputDefault placeholder={'Введите новый пароль'} value={password} onChange={(e) => {
          setPassword(e.target.value);

        }}
                      icon={'ShowIcon'} type={typePassword}/>
        <InputDefault placeholder={'Введите код из письма'} value={code} onChange={e => setCode(e.target.value)}
                      type='text'/>
        <Button type="primary" size="medium" onClick={() => {
          changePassword(password, code);
        }}>
          Восстановить
        </Button>
      </div>
      <div className={resetPWPage.text}>
        <div className={resetPWPage.textWrapper}>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
            <Link to="/login"
                  className={`text text_type_main-default text_color_inactive ${resetPWPage.link}`}> Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
