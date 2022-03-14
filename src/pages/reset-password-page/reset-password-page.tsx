import React, {FunctionComponent} from "react";
import {Link, Redirect, useLocation} from "react-router-dom";

import resetPWPage from "./reset-password-page.module.css";

import {changePassword} from "../../services/actions/api";

import {InputDefault} from "../../components/input-default/input-default";

import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {useAppDispatch, useSelector} from "../../services/types/hooks";

export const ResetPasswordPage: FunctionComponent = () => {
  const {userData, forgotPasswordMarker} = useSelector(state => {
    return state
  });

  const dispatch = useAppDispatch();

  const [password, setPassword] = React.useState<string>('');
  const [code, setCode] = React.useState<string>('');
  const typePassword = 'password';

  const location: { state: {from: Location} } = useLocation();

  if (userData.user.name !== '' && userData.user.email !== '') {
    return (
      <Redirect
        to={location.state?.from || '/' }
      />
    );
  } else if (forgotPasswordMarker.emailWasSent !== true) {
    return (
      <Redirect
        to={{pathname: "/login"}}/>
    );
  }

  return (
    <div>
      <form className={resetPWPage.wrapper} onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(changePassword(password, code));
      }}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <InputDefault placeholder={'Введите новый пароль'} value={password} onChange={(e) => {
          setPassword(e.target.value);

        }}
                      icon={'ShowIcon'} type={typePassword}/>
        <InputDefault placeholder={'Введите код из письма'} value={code} onChange={e => setCode(e.target.value)}
                      type='text'/>
        <Button type="primary" size="medium">
          Восстановить
        </Button>
      </form>
      <div className={resetPWPage.text}>
        <div className={resetPWPage.textWrapper}>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
            <Link to="/login"
                  className={`ml-2 text text_type_main-default text_color_inactive ${resetPWPage.link}`}>Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
