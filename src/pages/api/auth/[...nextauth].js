import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../../backend/models/user";
import bcrypt from "bcryptjs";
import { dbConnect } from "../../../../backend/config/dbConect";

const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        dbConnect();

        const { email, password } = credentials;

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
          throw new Error("Invalid Email or Password");
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
          throw new Error("Invalid Email or Password");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      // el user se le agrega en la segunda vuelta(cuando se recarga la pagina despues de que ya se esta logeado)
      user && (token.user = user);

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
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
