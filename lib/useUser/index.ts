'use client'

import axios from "axios";
import { useState, useEffect } from "react";

export type UserDetails = {
    id: number,
    name: string,
    email: string,
    password: string
    role: number,
    created_at: Date
}

export function useUser() {
    const [user, setUser] = useState<UserDetails | null>(null);

    async function getUserDetails(email: string) {
        let res = await axios.get('http://localhost:3000/api/users/byEmail?email=' + email)

        const data: UserDetails = await res.data

        return data
    }

    useEffect(() => {
        
    }, [])

    return {
        user, 
        getUserDetails
    }
}