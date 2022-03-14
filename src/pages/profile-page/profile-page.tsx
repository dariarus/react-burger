import React, {FunctionComponent} from "react";

import profilePage from "./profile-page.module.css";

import {AccountNavigation} from "../../components/account-navigation/account-navigation";

import {TPropsAccount} from "../../services/types/data";

export const AccountPage: FunctionComponent<TPropsAccount> = (props) => {
  return (
    <div className={profilePage.main}>
      <AccountNavigation text={props.text}/>
      <div>
        {props.children}
      </div>
    </div>
  )
}
