'use server'

import axios from "axios"

export async function addProperty(user_id: number, title: string, description: string, city: string, country: string, address: string, price: number, max_guests: number) {
    try {
        let res = await axios.post(`http://localhost:3000/api/properties`, {user_id, title, description, city, country, address, price, max_guests}, {method: "POST"});
        return res.data
    }
    catch (err: any) {
        console.error("Erreur API:", err.message);
        return {
            error: err.message
        }
    }
}