import React, {ChangeEvent, FunctionComponent} from "react";
import {Link, Redirect} from "react-router-dom";

import regPage from "./register-page.module.css";
import {EmailInputComponent} from "../../email-input/email-input";
import {PasswordInputComponent} from "../../password-input/password-input";

import {InputDefault} from "../../input-default/input-default";
import {register} from "../../../services/actions/api";
import {useAppDispatch, useSelector} from "../../../services/types/hooks";

import {Button} from "@ya.praktikum/react-developer-burger-ui-components";

export const RegistrationPage: FunctionComponent = () => {
  const {userData} = useSelector(state => {
    return state
  });

  const [name, setName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const dispatch = useAppDispatch();

  if (userData.user.name !== '' && userData.user.email !== '') {
    return (
      <Redirect
        to={{pathname: "/"}}/>
      // to={`${state?.from}` || '/' }/>
    );
  }

  return (
    <div>
      <div className={regPage.wrapper}>
        <h2 className="text text_type_main-medium">Регистрация</h2>
        <InputDefault placeholder={'Имя'} value={name} onChange={e => setName(e.target.value)} type='text'/>
        <EmailInputComponent value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setEmail(e.target.value)
        }}/>
        <PasswordInputComponent value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setPassword(e.target.value)}}/>
        <Button type="primary" size="medium" onClick={() => {
          dispatch(register(name, email, password));
        }}>
          Зарегистрироваться
        </Button>
      </div>
      <div className={regPage.text}>
        <div className={regPage.textWrapper}>
          <p className="text text_type_main-default text_color_inactive">
            Уже зарегистрированы?
            <Link to="/login"
                  className={`text text_type_main-default text_color_inactive ${regPage.link}`}> Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
