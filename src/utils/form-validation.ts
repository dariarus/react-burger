export const validateInputDefault = (type: 'text' | 'email' | 'password' | undefined, value: string) => {
  const inputError: { error: boolean, errorMessage: string } = {
    error: false,
    errorMessage: ''
  }
  switch (type) {
    case "text":
      if (value !== "" && value.length < 2) {
        inputError.error = true;
        inputError.errorMessage = 'Это поле должно содержать хотя бы 2 символа'
      }
      break;
    case "email":
      //if (value !== "" && ((!value.includes('@')) || (value.length < 6))) {
      // регулярное выражение: в поле маила д/б: текст-@-текст-.-текст
      if (value !== "" && !value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
        inputError.error = true;
        inputError.errorMessage = 'Укажите корректный e-mail'
      }
      break;
    case "password":
      if (value !== "" && value.length < 6) {
        inputError.error = true;
        inputError.errorMessage = 'Пароль должен состоять не менее чем из 6 символов'
      }
      break;
    default:
      console.log("Неопознанный тип поля ввода")
      break;
  }
  return inputError;
}
