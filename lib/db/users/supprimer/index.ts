'use server'

import axios from "axios"

export async function deleteUser(id: number) {
    try {
        let res = await axios.delete(`http://localhost:3000/api/users/delete/${id}`, {method: "DELETE"});
        console.log("Utilisateur supprimé");
        return res.status
    }
    catch (err: any) {
        console.error("Erreur API:", err.message);
        return {
            error: err.message
        }
    }
}