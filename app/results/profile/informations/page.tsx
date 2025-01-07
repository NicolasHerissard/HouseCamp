'use client'

import { updateUser } from "@/lib/db/users/modifier"
import { getUserByEmail } from "@/lib/db/users/byEmail"
import { UserDetails } from "@/lib/useUser"
import { useState } from "react"

export default function Informations() {

    const user: UserDetails = JSON.parse(localStorage.getItem('user') as string)
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)

    let role = ""
    if(user.role == 1) role = "Administrateur"
    else if(user.role == 0) role = "Utilisateur"
    else role = "Inconnu"

    async function ModifierUser() {
        let data = await updateUser(user.id, name, email)
        let currentUser: UserDetails = await getUserByEmail(data.toString())
        localStorage.setItem('user', JSON.stringify(currentUser))
    }

    return (
            <div>
                <div className="p-6 space-y-4 flex flex-col">
                    <label htmlFor="">Créer le : {}</label>
                    <label htmlFor="Adresse email">Adresse email : </label>
                    <input onChange={(e) => setEmail(e.target.value)} type="text" value={email} title="Adresse email" className="border border-black rounded-md h-14 p-2 text-xl" placeholder="Adresse email"/>
                    <label htmlFor="Nom">Nom : </label>
                    <input onChange={(e) => setName(e.target.value)} type="text" value={name} title="Nom" className="border border-black rounded-md h-14 p-2 text-xl" placeholder="Nom"/>
                    <label htmlFor="role">Rôle : </label>
                    <input type="text" value={role} title="Rôle" className="border border-black rounded-md h-14 p-2 text-xl" placeholder="Rôle" disabled/>
                    <button onClick={ModifierUser} className="bg-blue-500 w-32 p-3 rounded-md text-white" type="submit">Enregistrer</button>
                </div>
            </div>
        )
}