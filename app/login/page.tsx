'use client'

import { signIn, useSession } from "next-auth/react"
import { useState } from "react";

export default function Login() {

    const {data: session} = useSession();

    console.log(session)

    const [name, setName] = useState("name")
    const [email, setEmail] = useState("dfdf@e.com")
    const [password, setPassword] = useState("password")

    async function handleLogin() {
        const res = await signIn('credentials', {
            redirect: false,
            email: email,
            password: password,
        })

        if(!res?.error) {
            console.log("Logged In !")
        } else {
            console.log("Login Failed")
        }
    }

    return (
        <div>
            <button onClick={handleLogin}>Connexion</button>
        </div>
    )
}