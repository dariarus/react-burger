import React, {FunctionComponent} from "react";

import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import {TInputDefault} from "../../services/types/data";

export const EmailInputComponent: FunctionComponent<TInputDefault> = (props) => {
  return <EmailInput onChange={props.onChange} size={undefined} value={props.value} name={'email'} />
}
