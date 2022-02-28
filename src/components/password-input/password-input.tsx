import React, {FunctionComponent} from "react";

import { PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import {TInputDefault} from "../../services/types/data";

export const PasswordInputComponent: FunctionComponent<TInputDefault> = (props) => {
  return <PasswordInput onChange={props.onChange} size={"default"} value={props.value} name={'password'} />
}
