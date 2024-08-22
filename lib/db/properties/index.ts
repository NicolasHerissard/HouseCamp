'use server'

import axios from "axios"

export async function getProperties() {
    try {
        let res = await axios.get("http://localhost:3000/api/properties", {method: "GET"});
        let data = await res.data
        console.log("Données récupérées");
        return data;
    }
    catch (err: any) {
        console.error("Erreur API:", err.message);
        return {
            error: err.message
        }
    }
}