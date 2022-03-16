import React, {ChangeEvent, FunctionComponent} from "react";
import {Link, Redirect, useLocation} from "react-router-dom";

import regPage from "./register-page.module.css";
import {EmailInputComponent} from "../../components/email-input/email-input";
import {PasswordInputComponent} from "../../components/password-input/password-input";

import {InputDefault} from "../../components/input-default/input-default";
import {register} from "../../services/actions/api";
import {useAppDispatch, useSelector} from "../../services/types/hooks";

import {Button} from "@ya.praktikum/react-developer-burger-ui-components";

export const RegistrationPage: FunctionComponent = () => {
  const {userData} = useSelector(state => {
    return state
  });

  const [name, setName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const dispatch = useAppDispatch();

  const location: { state: {from: Location} } = useLocation();

  if (userData.user.name !== '' && userData.user.email !== '') {
    return (
      <Redirect
        to={location.state?.from || '/' }
      />
    );
  }

  return (
    <div>
      <form className={regPage.wrapper} onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(register(name, email, password));
      }}>
        <h2 className="text text_type_main-medium">Регистрация</h2>
        <InputDefault placeholder={'Имя'} value={name} onChange={e => setName(e.target.value)} type='text'/>
        <EmailInputComponent value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setEmail(e.target.value)
        }}/>
        <PasswordInputComponent value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setPassword(e.target.value)}}/>
        <Button type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </form>
      <div className={regPage.text}>
        <div className={regPage.textWrapper}>
          <p className="text text_type_main-default text_color_inactive">
            Уже зарегистрированы?
            <Link to="/login"
                  className={`ml-2 text text_type_main-default text_color_inactive ${regPage.link}`}>Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
