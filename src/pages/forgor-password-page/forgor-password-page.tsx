import React, {FunctionComponent} from "react";
import {Link, Redirect, useHistory, useLocation} from "react-router-dom";

import forgotPWPage from "./forgot-password-page.module.css";

import {InputDefault} from "../../components/input-default/input-default";
import {requestToResetPassword} from "../../services/actions/change-password";

import {useAppDispatch, useSelector} from "../../services/types/hooks";

import {Button} from "@ya.praktikum/react-developer-burger-ui-components";

export const ForgotPasswordPage: FunctionComponent = () => {
  const {userData} = useSelector(state => {
    return state
  });

  const [value, setValue] = React.useState<string>('');

  const history = useHistory();
  const redirectToChangePWPage = React.useCallback(() => {
      history.replace({pathname: '/reset-password'});
    },
    [history]
  );

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
      <form className={forgotPWPage.wrapper} onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (value !== '') {
          dispatch(requestToResetPassword(value, redirectToChangePWPage));
        }
      }}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <InputDefault placeholder={'Укажите e-mail'} value={value} onChange={e => setValue(e.target.value)}
                      type='email'/>
        <Button type="primary" size="medium">
          Восстановить
        </Button>
      </form>
      <div className={forgotPWPage.text}>
        <div className={forgotPWPage.textWrapper}>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
            <Link to="/login"
                  className={`ml-2 text text_type_main-default text_color_inactive ${forgotPWPage.link}`}>Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
