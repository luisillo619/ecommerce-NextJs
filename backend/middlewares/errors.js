import ErrorHandler from "../utils/errorHandler";

export default (err, req, res, next) => {
  let error = { ...err };

  error.statusCode = err.statusCode || 500;
  error.message = err.message || "Internal Server Error";

  if (err.name == "ValidationError") {
    const message = Object.values(err.errors).map((value) => {
      switch (value.kind) {
        case "Number":
          return `El campo ${value.path} debe ser un número.`;
        case "String":
          return `El campo ${value.path} debe ser una cadena de texto.`;
        case "ObjectId":
          return `El campo ${value.path} debe ser un ObjectId válido.`;
        case "Date":
          return `El campo ${value.path} debe ser una fecha válida.`;
        case "Boolean":
          return `El campo ${value.path} debe ser un valor booleano.`;
        case "Array":
          return `El campo ${value.path} debe ser un array.`;
        case "Buffer":
          return `El campo ${value.path} debe ser un buffer.`;
        case "Decimal128":
          return `El campo ${value.path} debe ser un decimal válido.`;
        case "Map":
          return `El campo ${value.path} debe ser un mapa.`;
        default:
          return value.message;
      }
    });
    error = new ErrorHandler(message, 400);
  }

  if (err.code == 11000) {
    const message = `El valor ${Object.values(
      err.keyValue
    )} ya está en uso para el campo ${Object.keys(err.keyValue)}`;
    error = new ErrorHandler(message, 400);
  }

  res.status(error.statusCode).json({
    success: false,
    error,
    message: error.message,
    stack: error.stack,
  });
};
