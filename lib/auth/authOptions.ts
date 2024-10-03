import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import type { NextAuthOptions } from "next-auth";
import axios from "axios";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
            authorization: {
                params: {}
            },
            checks: ['none']
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
            authorization: {
                params: {}
            },
            checks: ['none']
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {

                    if(!credentials || !credentials.email || !credentials.password) {
                        throw new Error("Invalid credentials");
                    }

                    const {email, password} = credentials || {}
                    const res = await axios.post('http://localhost:3000/api/auth/login', {
                        'email': email,
                        'password': password,
                    }, {
                        headers: { "Content-Type": "application/json" },
                    })

                    const user = await res.data

                    if(user) {
                        console.log("Credentials saved successfully")
                        return user
                    }

                    return null
                }
                catch (err: any) {
                    console.error("Erreur d'authentification : " + err.message);

                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: '/login',
    },
    adapter: PrismaAdapter(prisma),
}