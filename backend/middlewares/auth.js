import ErrorHandler from "../utils/errorHandler";

const isAuthenticatedUser = async (req, res, next) => {
  const session = JSON.parse(req.headers["x-user-session"]);

  if (!session) {
    return next(
      new ErrorHandler("Inicia sesion para tener acceso a esta ruta", 401)
    );
  }
  req.user = session.user;

  next();
};

export { isAuthenticatedUser };
