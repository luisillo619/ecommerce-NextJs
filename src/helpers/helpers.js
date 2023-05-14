export function getPriceQueryParams(queryParams, key, value) {
  const hasValueInParam = queryParams.has(key);
  if (value && hasValueInParam) {
    queryParams.set(key, value); // La query existe y se ha proporcionado un valor, por lo tanto unicamente se setea
  } else if (value) {
    // La query no existe, por lo tanto se crea y se le agrega el valor
    queryParams.append(key, value);
  } else if (hasValueInParam) {
    // La query existe, pero no se le proporciona ningun valor, por lo tanto se elimina
    queryParams.delete(key, value);
  }
  return queryParams;
}

export const parseCallbackUrl = (url) => {
  const res = url.replace(/%3A/g, ":").replace(/%2F/g, "/");
  return res;
};