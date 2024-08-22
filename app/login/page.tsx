'use client'

import { signIn, useSession, signOut } from "next-auth/react"

export default function Login() {

    const {data: session} = useSession();

    console.log(session)

    return (
        <div>
            <div>
                <button onClick={() => signIn('github')}>Connexion avec Github</button>
            </div>
            <div>
                <button onClick={() => signIn('google')}>Connexion avec Google</button>
            </div>
            <div>
               <button onClick={() => {signOut()}}>Deconnexion</button>
            </div>
        </div>
    )
}