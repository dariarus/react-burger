enum ingredientTypeRuName {
  bun = "Булки",
  sauce = "Соусы",
  main = "Начинка"
}

const queryBurgerDataUrl = 'https://norma.nomoreparties.space/api';

// const ingredientProperties = PropTypes.arrayOf(PropTypes.shape({
//   _id: PropTypes.string.isRequired,
//   type: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   price: PropTypes.number.isRequired,
//   image: PropTypes.string.isRequired,
//   image_large: PropTypes.string.isRequired,
//   calories: PropTypes.number.isRequired,
//   proteins: PropTypes.number.isRequired,
//   fat: PropTypes.number.isRequired,
//   carbohydrates: PropTypes.number.isRequired,
// })).isRequired

function setCookie(cookieName: string, tokenValue: string | number | boolean | null, props?: any) { // TODO: выяснить, что за тип у пропсов
  props = props || {}
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

export {ingredientTypeRuName, queryBurgerDataUrl, setCookie, getCookie};
