'use server'

import axios from "axios"

export async function postRegister(name: string, email: string, password: string) {
    try {
        await axios.post('http://localhost:3000/api/auth/register', {
            "name": name,
            "email": email,
            "password": password,
        })

        console.log("Compte créé avec succès");
    }
    catch (err: any) {
        console.error("Erreur lors de la création du compte :", err.message);
    }
}