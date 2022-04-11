export function getResponseData<T>(res: Response): Promise<T> {
  if (!res.ok) {
    // return Promise.reject(res.json());
    return res.text().then(text => {
      throw new Error(`Ошибка: ${text}`)
    })
  }
  return res.json();
}

export function throwOnError<T>(res: Response): Promise<T> {
  if (!res.ok) {
    return res.text().then(text => {
      throw new Error(text)
    })
  }
  return res.json();
}
