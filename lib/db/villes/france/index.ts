'use server'

import axios from "axios"

export async function getVilles() {
    try {
        let res = await axios.get("http://localhost:3000/api/villes/france", {method: "GET"});
        return res.data
    }
    catch (err: any) {
        console.error("Erreur API:", err.message);
        return {
            error: err.message
        }
    }
}