import React, {FunctionComponent} from "react";

import {useAppDispatch} from "../../services/types/hooks";

import profile from './profile-details.module.css';

import {InputDefault} from "../input-default/input-default";
import {refreshUserData} from "../../services/actions/api";
import {getCookie} from "../../utils/burger-data";

import {useSelector} from "../../services/types/hooks";

import {Button} from "@ya.praktikum/react-developer-burger-ui-components";

export const ProfileDetails: FunctionComponent = () => {
  const {userData} = useSelector(state => {
    return state
  });

  const dispatch = useAppDispatch();

  const [username, setUsername] = React.useState<string>(''); // инф-ция о юзере, приходящая в ответе от api после регисрации
  const [login, setLogin] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  React.useEffect(() => {
    if (userData.user.name !== '' && userData.user.email !== '') {
      setUsername(userData.user.name);
      setLogin(userData.user.email);
    }
  }, [userData.user])

  // проверяем, изменилась ли форма, чтобы показать кнопки
  const isFormChanged =
    username !== userData.user.name ||
    login !== userData.user.email ||
    password

  return (
    <>
      <form className={profile.wrapper} onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(refreshUserData(getCookie('accessToken'), username, login, password));
      }}>
        <InputDefault value={username} onChange={(e) => {
          setUsername(e.target.value);
        }} type="text" placeholder="Имя" icon="EditIcon"/>
        <InputDefault value={login} onChange={(e) => {
          setLogin(e.target.value);
        }} type="email" placeholder="Логин" icon="EditIcon"/>
        <InputDefault value={password} onChange={(e) => {
          setPassword(e.target.value);
        }} type="password" placeholder="Пароль" icon="EditIcon"/>
        {
          isFormChanged &&
          <div className={profile.buttons}>
            <Button type="primary" size="medium">Сохранить</Button>
            <Button type="secondary" size="medium" onClick={() => {
              setUsername(userData.user.name);
              setLogin(userData.user.email);
            }}>Отмена</Button>
          </div>
        }
      </form>
    </>
  )
}
