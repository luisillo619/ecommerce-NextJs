import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

import User from "../../../../backend/models/user";
import bcrypt from "bcryptjs";
import { dbConnect } from "../../../../backend/config/dbConect";

export default async function auth(req,res){
   return await NextAuth(req,res,{
    session:{
        strategy: "jwt"
    },
    providers:[
        Credentials({
            // credentials vienen del frontend
            async authorize(credentials){
                dbConnect()

                const {email, password} = credentials

                const user = await User.findOne({email}).select("+password")
                
                if(!user){
                    throw new Error("Correo o contraseña incorrectos")
                }

                const isPasswordMatch = await bcrypt.compare(
                    password,
                    user.password
                )

                if(!isPasswordMatch){
                    throw new Error("Correo o contraseña incorrectos")
                }

                return user // this user
            }
        })
    ],
    callbacks:{
       jwt: async({token,user}) =>{
          user && (token.user = user);
          return token // this token
       },
       session: async ({session,token})=>{
         session.user = token.user
         
         //delete password of session
         delete session?.user?.password

         return session
       }
    },
    pages:{
        signIn: "/login" // si el usuario entra en profile y no a iniciado sesion, nos va a mandar a el login por el matcher
    },
    secret: process.env.NEXTAUTH_SECRET
   })
}