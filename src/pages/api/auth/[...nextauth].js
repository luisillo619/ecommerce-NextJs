import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import User from "../../../../backend/models/user";
import bcrypt from "bcryptjs";
import { dbConnect } from "../../../../backend/config/dbConect";
import { sendWelcomeMail } from "../../../../backend/utils/nodemailer";

export default async function auth(req, res) {
  return await NextAuth(req, res, {
    session: {
      strategy: "jwt",
    },
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),

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

          if (user.isOAuthUser && !user.password) {
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
      jwt: async ({ token, user, account }) => {
        if (account?.provider === "credentials") {
          token.user = user;
        } else if (account?.provider === "google") {
          const existingUser = await User.findOne({ email: user.email });
          token.user = existingUser;
        }

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

        // Elimina la contraseña de la sesión
        delete session?.user?.password;
        return session;
      },

      // SI RETUR ES TRUE, HACE LA REDIRECCION A JWT
      signIn: async ({ user, account, profile }) => {
        if (account.provider === "google") {
          try {
            dbConnect();
            let existingUser = await User.findOne({
              email: profile.email.toLowerCase(),
            });

            if (!existingUser) {
              const avatar = {
                url: profile.picture,
                public_id: profile.sub,
              };

              existingUser = await User.create({
                name: profile.name,
                email: profile.email.toLowerCase(),
                googleId: user.id,
                isOAuthUser: true,
                avatar,
              });

              await sendWelcomeMail({
                email: profile.email,
                name: profile.name,
              });
            } else if (!existingUser.googleId) {
              existingUser.googleId = user.id;
              existingUser.isOAuthUser = true;
              await existingUser.save();
            }
            return true;
          } catch (error) {
            throw new Error("Error en el inicio de sesión de Google");
          }
        } else if (account.provider === "credentials") {
          return true;
        }
      },
    },

    pages: {
      signIn: "/login", // Si el middleware detecta acceso no autenticado a rutas protegidas, redirige a "/login"
    },
    secret: process.env.NEXTAUTH_SECRET,
  });
}
