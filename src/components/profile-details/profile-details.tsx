import React, {FunctionComponent} from "react";

import profile from './profile-details.module.css';

import {InputDefault} from "../input-default/input-default";

import {useSelector} from "../../services/types/hooks";

export const ProfileDetails: FunctionComponent = () => {
  const {userData} = useSelector(state => {
    return state
  });

  const [username, setUsername] = React.useState<string>(userData.user.name); // инф-ция о юзере, приходящая в ответе от api после регисрации
  const [login, setLogin] = React.useState<string>(userData.user.email);
  const [password, setPassword] = React.useState<string>('');

  console.log(userData); // "" и ""

  //TODO: после создания регистрации доделать проброс значений в соотв-щие поля - username и login!!

  return (
    <div className={profile.wrapper}>
      <InputDefault value={username} onChange={(e) => {
        setUsername(e.target.value);
      }} type="text" placeholder="Имя" icon="EditIcon"/>
      <InputDefault value={login} onChange={(e) => {
        setLogin(e.target.value);
      }} type="email" placeholder="Логин" icon="EditIcon"/>
      <InputDefault value={password} onChange={(e) => {
        setPassword(e.target.value);
      }} type="password" placeholder="Пароль" icon="EditIcon"/>
    </div>
  )
}
