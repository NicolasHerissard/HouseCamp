'use server'

import axios from "axios"

export async function getBookingsByUserId(user_id: number) {
    try {
        let res = await axios.get(`http://localhost:3000/api/bookings/user/${user_id}`, {method: "GET"});
        let data = await res.data
        return data;
    }
    catch (err: any) {
        console.error("Erreur API:", err.message);
        return {
            error: err.message
        }
    }
}

export async function getBookingById(id: number) {
    try {
        let res = await axios.get(`http://localhost:3000/api/bookings/${id}`, {method: "GET"});
        let data = await res.data
        return data;
    }
    catch (err: any) {
        console.error("Erreur API:", err.message);
        return {
            error: err.message
        }
    }
}

export async function getAllBookings() {
    try {
        let res = await axios.get(`http://localhost:3000/api/bookings`, {method: "GET"});
        let data = await res.data
        return data;
    }
    catch (err: any) {
        console.error("Erreur API:", err.message);
        return {
            error: err.message
        }
    }
}