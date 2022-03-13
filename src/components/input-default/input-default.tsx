import React, {FunctionComponent} from "react";

import {Input} from '@ya.praktikum/react-developer-burger-ui-components';
import {TInputDefault} from "../../services/types/data";
import {TICons} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import {validateInputDefault} from "../../utils/form-validation";
import {useHistory} from "react-router-dom";

export const InputDefault: FunctionComponent<TInputDefault> = (props) => {
  const [icon, changeIcon] = React.useState<keyof TICons | undefined>(props.icon);
  const [inputType, changeInputType] = React.useState<'text' | 'email' | 'password' | undefined>(props.type);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const onIconClick = () => {
    setTimeout(() => {
      if (null !== inputRef.current) {
        return inputRef.current.focus(), 0;
      }
    })
    // alert('Вы уверены?')
    if (icon === 'ShowIcon') {
      changeIcon('HideIcon');
      changeInputType('text');
    } else if (icon === 'HideIcon') {
      changeIcon('ShowIcon');
      changeInputType('password');
    }
  }

  const inputError = validateInputDefault(inputType, props.value);

  return (
    <Input
      type={inputType}
      placeholder={props.placeholder}
      onChange={props.onChange}
      value={props.value}
      name={'name'}
      error={inputError.error}
      ref={inputRef}
      icon={icon}
      onIconClick={onIconClick}
      errorText={inputError.errorMessage}
      size={'default'}
    />
  )
}
