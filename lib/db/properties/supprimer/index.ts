'use server'

import axios from "axios"

export async function deleteProperty(id: number) {
    try {
        let res = await axios.delete(`http://localhost:3000/api/properties/${id}`, {method: "DELETE"});
        return res.status
    }
    catch (err: any) {
        console.error("Erreur API:", err.message);
        return {
            error: err.message
        }
    }
}