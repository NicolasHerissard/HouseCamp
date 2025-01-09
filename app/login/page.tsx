'use client'

import { signIn, useSession } from "next-auth/react"
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/useUser";

export default function Login() {

    const {data: session} = useSession();
    const router = useRouter()
    const {getUserDetails} = useUser()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    async function handleLogin(e: FormEvent) {
        if(email != "" && password != "") {
            e.preventDefault()
            const res = await signIn('credentials', {
                redirect: false,
                email: email,
                password: password,
            })
        
            if(!res?.error) {
                let u = await getUserDetails(email)
                localStorage.setItem("user", JSON.stringify(u))
                router.push("/results")
            } else {
                setError(res.error)
                setTimeout(() => {
                    setError('')
                }, 5000)
            }
        } else {
            setError("Veuillez remplir tous les champs")
            setTimeout(() => {
                setError('')
            }, 5000)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
                <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900">Se connecter</h2>
                <p className="mt-2 text-sm text-gray-600">
                    Connectez-vous à votre compte
                </p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <p>{error}</p>
                </div>
                <div className="rounded-md shadow-sm space-y-4">
                    <div>
                    <label htmlFor="email" className="sr-only">Email</label>
                    <input
                        onChange={(e) => {setEmail(e.target.value)}}
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Adresse email"
                    />
                    </div>
                    <div>
                    <label htmlFor="password" className="sr-only">Mot de passe</label>
                    <input
                        onChange={(e) => {setPassword(e.target.value)}}
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Mot de passe"
                    />
                    </div>
                </div>
                <div className="flex space-x-5">
                    <div>
                        <button className="border border-black rounded h-14 p-1" onClick={() => {signIn('google')}} disabled>Connexion avec Google</button>
                    </div>
                    <div>
                        <button className="border border-black rounded h-14 p-1" onClick={() => {signIn('github')}} disabled>Connexion avec Github</button>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                    <input
                        id="remember_me"
                        name="remember_me"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                        Se souvenir de moi
                    </label>
                    </div>
                    <div className="text-sm">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Mot de passe oublié?
                    </a>
                    </div>
                </div>
                <div>
                    <button
                    onClick={(e) => {handleLogin(e)}}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                    Se connecter
                    </button>
                </div>
                <div className="text-center">
                <p className="text-sm text-gray-600">
                    Pas encore de compte?{' '}
                    <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Inscrivez-vous
                    </a>
                </p>
                </div>
            </div>
        </div>
    )
}