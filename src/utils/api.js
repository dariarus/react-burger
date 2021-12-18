import {queryBurgerDataUrl} from "./burger-data.js";

export function getResponseData(res) {
  if (!res.ok) {
   // return Promise.reject(res.json());
    return res.text().then(text => { throw new Error(`Ошибка: ${text}`) })
  }
  return res.json();
}

export function doOrder(ingredientsIdList) {
  return fetch(`${queryBurgerDataUrl}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "ingredients": ingredientsIdList
    })
  })
    .then(res => getResponseData(res))
}
