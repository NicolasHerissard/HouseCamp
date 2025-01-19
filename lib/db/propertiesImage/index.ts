'use server'

import axios from "axios"

export async function createPropertiesImage(property_id: number, image: string) {
    try {
        let res = await axios.post(`http://localhost:3000/api/image`, {
            property_id,
            image
        })
        return res.data
    }
    catch (err: any) {
        console.error("Erreur API:", err.message);
    }
}