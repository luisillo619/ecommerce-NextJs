import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../../backend/models/user";
import bcrypt from "bcryptjs";
import { dbConnect } from "../../../../backend/config/dbConect";

export default async function auth(req, res) {
  return await NextAuth(req, res, {
    session: {
      strategy: "jwt",
    },
    providers: [
      CredentialsProvider({
        async authorize(credentials, req) {
          dbConnect();

          const { email, password } = credentials;

          const user = await User.findOne({
            email: email.toLowerCase(),
          }).select("+password");

          if (!user) {
            throw new Error("Correo o contraseña incorrecta");
          }

          const isPasswordMatched = await bcrypt.compare(
            password,
            user.password
          );

          if (!isPasswordMatched) {
            throw new Error("Correo o contraseña incorrecta");
          }

          return user;
        },
      }),
    ],
    callbacks: {
      jwt: async ({ token, user }) => {
        // El user se le agrega en la segunda vuelta (cuando se recarga la página después de que ya se logeó)
        user && (token.user = user);

        // Para que los cambios se vean automáticamente después de que el usuario actualiza su perfil
        const update = req.query?.update;

        if (update === "true") {
          const updatedUser = await User.findById(token.user._id);
          token.user = updatedUser;
        }

        return token;
      },
      session: async ({ session, token }) => {
        session.user = token.user;

        // delete password from session
        delete session?.user?.password;

        return session;
      },
    },

    pages: {
      signIn: "/login", // Por si el match del middleware concide y no existe la sesion del usuario va a redirigir a /login
    },
    secret: process.env.NEXTAUTH_SECRET,
  });
}
