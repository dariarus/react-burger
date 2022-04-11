import React, {ChangeEvent, FunctionComponent} from "react";
import {Link, Redirect, useLocation} from "react-router-dom";

import authPage from "./authorisation-page.module.css";

import {EmailInputComponent} from "../../components/email-input/email-input";
import {PasswordInputComponent} from "../../components/password-input/password-input";

import {Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {authorise} from "../../services/actions/auth";
import {useAppDispatch, useSelector} from "../../services/types/hooks";
import {TLocationState} from "../../services/types/data";

export const AuthorisationPage: FunctionComponent = () => {
  const {userData} = useSelector(state => {
    return state
  });

  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const dispatch = useAppDispatch();

  const location = useLocation<TLocationState>();

  if (userData.user.name !== '' && userData.user.email !== '') {
    return (
      <Redirect
        // to={`${location.state?.from?.pathname}` || '/' }/> - тоже работает О_о
        to={location.state?.from || '/' }
      />
    );

  }

  return (
    <div>
      <form className={authPage.wrapper} onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(authorise(email, password));
      }}>
        <h2 className="text text_type_main-medium">Вход</h2>
        <EmailInputComponent value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setEmail(e.target.value)
        }}/>
        <PasswordInputComponent value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setPassword(e.target.value)
        }}/>
        <Button type="primary" size="medium">
          Войти
        </Button>
      </form>
      <div className={authPage.text}>
        <div className={authPage.textWrapper}>
          <p className="text text_type_main-default text_color_inactive">
            Вы — новый пользователь?
            <Link to="/register"
                  className={`ml-2 text text_type_main-default text_color_inactive ${authPage.link}`}>Зарегистрироваться
            </Link>
          </p>
        </div>
        <div className={authPage.textWrapper}>
          <p className="mt-4 text text_type_main-default text_color_inactive">
            Забыли пароль?
            <Link to="/forgot-password"
                  className={`ml-2 text text_type_main-default text_color_inactive ${authPage.link}`}>Восстановить пароль
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
