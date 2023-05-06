import mongoose from "mongoose";
import { parse } from "url";

export function isMongoId(id, res) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      error: "El id es invalido",
    });
  }
}

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

export const parseCallbackUrl = (callbackUrl) => {
  const parsedUrl = parse(callbackUrl, true);
  delete parsedUrl.search;
  return parsedUrl.path;
};
