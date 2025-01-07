'use server'

import axios from "axios"

export async function updateUser(id: number, name: string, email: string) {
    try {
        await axios.put(`http://localhost:3000/api/users/update/${id}`, {name, email}, {method: "PUT"});
        return email
    }
    catch (err: any) {
        console.error("Erreur API:", err.message);
        return {
            error: err.message
        }
    }
}