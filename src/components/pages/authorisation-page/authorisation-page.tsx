import React, {ChangeEvent, FunctionComponent} from "react";
import {Link, useHistory, Redirect} from "react-router-dom";

import { pathToRegexp, match, parse, compile } from "path-to-regexp";

import authPage from "./authorisation-page.module.css";

import {EmailInputComponent} from "../../email-input/email-input";
import {PasswordInputComponent} from "../../password-input/password-input";

import {Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {authorise} from "../../../services/actions/api";
import {useAppDispatch, useSelector} from "../../../services/types/hooks";

export const AuthorisationPage: FunctionComponent = () => {


  const {userData} = useSelector(state => {
    return state
  });

  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const dispatch = useAppDispatch();

  const history = useHistory();
  const redirectToMainPage = React.useCallback(() => {
    history.replace({pathname: '/'});
  }, [history])

  if (userData.user.name !== '' && userData.user.email !== '') {
    return (
      // Переадресовываем авторизованного пользователя на главную страницу
      <Redirect
        to={{pathname: "/"}}/>
        // to={`${state?.from}` || '/' }/> // не может найти имя state
    );
  }

  return (
    <div>
      <div className={authPage.wrapper}>
        <h2 className="text text_type_main-medium">Вход</h2>
        <EmailInputComponent value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setEmail(e.target.value)
        }}/>
        <PasswordInputComponent value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setPassword(e.target.value)
        }}/>
        <Button type="primary" size="medium" onClick={() => {
          dispatch(authorise(email, password));
          if (userData.success) {
            redirectToMainPage();
          }
        }}>
          Войти
        </Button>
      </div>
      <div className={authPage.text}>
        <div className={authPage.textWrapper}>
          <p className="text text_type_main-default text_color_inactive">
            Вы — новый пользователь?
            <Link to="/register"
                  className={`text text_type_main-default text_color_inactive ${authPage.link}`}> Зарегистрироваться
            </Link>
          </p>
        </div>
        <div className={authPage.textWrapper}>
          <p className="mt-4 text text_type_main-default text_color_inactive">
            Забыли пароль?
            <Link to="/forgot-password"
                  className={`text text_type_main-default text_color_inactive ${authPage.link}`}> Восстановить пароль
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
