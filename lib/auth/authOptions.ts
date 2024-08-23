import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();

export const authOptions = {
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
                    const {email, password} = credentials || {}

                    const res = await axios.post('http://localhost:3000/api/auth/login', {
                        'email': email,
                        'password': password,
                        headers: { "Content-Type": "application/json" },
                    })

                    const user = await res.data

                    if(user) {
                        return user
                    }

                    return null
                }
                catch (err: any) {
                    console.error("Erreur de l'authentification : " + err.message);

                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async session(session: any, user: any) {
            session.user = user;
            return session;
        },
        async jwt(token: any, user: any) {
            if (user) {
            token.id = user.id;
            }
            return token;
        },
    },
    adapter: PrismaAdapter(prisma),
}

// const res = await axios.post('http://localhost:3000/api/users', {
//     'name': credentials?.name,
//     'email': credentials?.email,
//     'password': credentials?.password,
//     headers: { "Content-Type": "application/json" },
// });

// const user = await res.data;

// if(user) {
//     return user;
// }

// return null;