'use client'

import { UserDetails } from "@/lib/useUser"
import { useRouter } from "next/navigation"
import { deleteUser } from "@/lib/db/users/supprimer"

export default function SupprimerCompte() {

    const user: UserDetails = JSON.parse(localStorage.getItem('user') as string)
    const router = useRouter()
    
    async function SupprimerCompte() {
        await deleteUser(user.id)
        router.push("/login")
    }

    return (
        <div>
            <div className="flex flex-col space-y-4 p-20 text-xl">
                <h1>Supprimer mon compte</h1>
                <p>Vous allez supprimer votre compte de HouseCamp. Cette action est irréversible.</p>
                <p>Cette action supprimera toutes vos données tels que vos offres, vos messages, etc...</p>
                <p>Veuillez confirmer votre choix en cliquant sur le bouton ci-dessous.</p>
                <button onClick={SupprimerCompte} className="bg-blue-500 w-32 rounded-md text-white" type="submit">Supprimer mon compte</button>
            </div>
        </div>
    )
}