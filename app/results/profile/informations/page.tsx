'use client'

import Header from "@/app/components/header"
import Sidebar from "@/app/components/profile/sidebar"
import { UserDetails } from "@/lib/useUser"

export default function Informations() {

    const user: UserDetails = JSON.parse(localStorage.getItem('user') as string)

    let role = ""
    if(user.role == 1) role = "Administrateur"
    else if(user.role == 0) role = "Utilisateur"
    else role = "Inconnu"

    return (
            <div>
                <div className="p-6 space-y-4 flex flex-col">
                    <label htmlFor="">Créer le : {user.created_at.toString()}</label>
                    <label htmlFor="Adresse email">Adresse email : </label>
                    <input type="text" value={user.email} title="Adresse email" className="border border-black rounded-md h-14 p-2 text-xl" placeholder="Adresse email"/>
                    <label htmlFor="Nom">Nom : </label>
                    <input type="text" value={user.name} title="Nom" className="border border-black rounded-md h-14 p-2 text-xl" placeholder="Nom"/>
                    <label htmlFor="role">Rôle : </label>
                    <input type="text" value={role} title="Rôle" className="border border-black rounded-md h-14 p-2 text-xl" placeholder="Rôle" disabled/>
                </div>
            </div>
        )
}