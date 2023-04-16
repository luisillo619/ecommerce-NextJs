import { getSession } from "next-auth/react" //BACK
import ErrorHandler from "../utils/errorHandler"

const isAuthenticatedUser = async (req, res, next) => {
  const session = await getSession({ req }); // validara las cookies y token

  if (!session)
    return next(
      new ErrorHandler("Inicia sesion para tener acceso a esta ruta", 401)
    );

  req.user = session.user;
  next();
};

export { isAuthenticatedUser };
