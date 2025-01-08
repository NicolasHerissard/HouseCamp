'use server'

import axios from "axios"

export async function addBooking(user_id: number, property_id: number, check_in_date: string, check_out_date: string, total_price: number) {
    try {
        let res = await axios.post(`http://localhost:3000/api/bookings`, {user_id, property_id, check_in_date, check_out_date, total_price}, {method: "POST"});
        return res.data
    }
    catch (err: any) {
        console.error("Erreur API:", err.message);
        return {
            error: err.message
        }
    }
}