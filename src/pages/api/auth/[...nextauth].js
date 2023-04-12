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

                return user
            }
        })
    ],
    pages:{
        signIn: "/login" // si el user no ha iniciado sesion nos llevara a login
    },
    secret: process.env.NEXTAUTH_SECRET
   })
}