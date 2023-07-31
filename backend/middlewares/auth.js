import ErrorHandler from "../utils/errorHandler";
import User from "../models/user";

const isAuthenticatedUser = async (req, res, next) => {
  const session =
    req?.headers?.["x-user-session"] &&
    JSON.parse(req.headers["x-user-session"]);

  if (!session.user.id) {
    return next(
      new ErrorHandler("Inicia sesion para tener acceso a esta ruta.", 401)
    );
  }
  const user = await User.findById(session.user.id);
  req.user = user;
  next();
};

const autorizeRoles = (...roles) => {
  // Las rutas esta esperando que se retorne (req,res,next) por lo tanto nosotros lo podemos hacer manualmente
  return (req, res, next) => {
    if (!roles.includes(req?.user?.role)) {
      return next(
        new ErrorHandler(
          `El role (${req?.user?.role}) no tiene el acceso a este recurso.`
        )
      );
    }
    next();
  };
};

export { isAuthenticatedUser, autorizeRoles };

// Es un ejemplo de lo que esta pasando arriba, Esto es conocido como patron de orden superior, una clousure al final de cuentas

// function crearSaludo(nombre) { //...roles
//   return function(saludo) { //req,res,next
//     return `${saludo}, ${nombre}!`;
//   };
// }

// const saludoParaJuan = crearSaludo('Juan');

// console.log(saludoParaJuan('Hola'));  // Imprime: 'Hola, Juan!'
// console.log(saludoParaJuan('Buenos días'));  // Imprime: 'Buenos días, Juan!'
