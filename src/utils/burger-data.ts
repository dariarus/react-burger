enum ingredientTypeRuName {
  bun = "Булки",
  sauce = "Соусы",
  main = "Начинка"
}

const queryBurgerDataUrl = 'https://norma.nomoreparties.space/api';
const queryFeedDataUrl = 'wss://norma.nomoreparties.space/api';

function setCookie(cookieName: string, tokenValue: string | number | boolean | null, props: any = {}) {
  props = {
    path: '/',
    ...props
  }
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  if (tokenValue !== null) {
    tokenValue = encodeURIComponent(tokenValue);
  }
  let updatedCookie = cookieName + '=' + tokenValue;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

function getCookie(cookieName: string) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + cookieName.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(cookieName: string) {
  // Находим куку по ключу token, удаляем её значение,
  // устанавливаем отрицательное время жизни, чтобы удалить сам ключ token
  setCookie(cookieName, null, { expires: -1 });
}

export {ingredientTypeRuName, queryBurgerDataUrl, queryFeedDataUrl, setCookie, getCookie};
