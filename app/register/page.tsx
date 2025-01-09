'use client'

import { useState } from "react"
import { postRegister } from "@/lib/db/register"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"


export default function Register() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()
    const [error, setError] = useState("")

    async function handleRegister() {
        try {
            if(name != "" && email != "" && password != "") {
                await postRegister(name, email, password)
    
                setName('')
                setEmail('')
                setPassword('')
    
                router.push('/login')
            } else {
                setError("Veuillez remplir tous les champs")
                setTimeout(() => {
                    setError('')
                }, 5000)
            }
        }
        catch (err: any) {
            setError(err.message)
            setTimeout(() => {
                setError('')
            }, 5000)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-img-login bg-cover bg-no-repeat">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
                <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900">S'inscrire</h2>
                <p className="mt-2 text-sm text-gray-600">
                    Inscrivez-vous !
                </p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <p>{error}</p>
                </div>
                <div className="rounded-md shadow-sm space-y-4">
                    <div>
                    <label htmlFor="name" className="sr-only">Name</label>
                    <input
                        onChange={(e) => {setName(e.target.value)}}
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Nom d'utilisateur"
                    />
                    </div>
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
                <div>
                    <button
                    onClick={handleRegister}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                    S'inscrire
                    </button>
                </div>
                <div className="text-center">
                <p className="text-sm text-gray-600">
                    Vous-avez déjà un compte?{' '}
                    <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Connectez-vous
                    </a>
                </p>
                </div>
            </div>
        </div>
    )
}