'use server'
import axios from "axios";

export async function getUsers() {
    try {
        let res = await axios.get("http://localhost:3000/api/users", {method: "GET"});
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