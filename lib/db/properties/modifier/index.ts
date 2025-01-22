'use server'

import axios from "axios"

export async function updateProperty(id: number, name: string, description: string, price: number, city: string, maxGuests: number, country: string, address: string) {
    try {
        let res = await axios.put(`http://localhost:3000/api/properties/${id}`, {name, description, price, city, maxGuests, country, address}, {method: "PUT"});
        return res.status
    }
    catch (err: any) {
        console.error("Erreur API:", err.message);
        return {
            error: err.message
        }
    }
}