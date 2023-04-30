import { getSession } from "next-auth/react";
import ErrorHandler from "../utils/errorHandler";

const isAuthenticatedUser = async (req, res, next) => {
  console.log(req.headers.cookie);
  const sessionCookie = req.headers.cookie
    ?.split(";")
    .find((c) => c.trim().startsWith("next-auth.session-token="));
    
  if (!sessionCookie) {
    return next(
      new ErrorHandler("Inicia sesion para tener acceso a esta ruta", 401)
    );
  }
  const sessionToken = sessionCookie.split("=")[1];
  const session = await getSession({
    req: { headers: { cookie: `next-auth.session-token=${sessionToken}` } },
  });
  

  if (!session) {
    return next(
      new ErrorHandler("Inicia sesion para tener acceso a esta ruta", 401)
    );
  }
  req.user = session.user;
  next();
};

export { isAuthenticatedUser };
