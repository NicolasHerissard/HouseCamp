'use server'

import axios from "axios"

export async function getAllEquipments() {
    try {
        let res = await axios.get(`http://localhost:3000/api/equipments`, {method: "GET"});
        return res.data
    }
    catch (err: any) {
        console.error("Erreur API:", err.message);
        return {
            error: err.message
        }
    }
}