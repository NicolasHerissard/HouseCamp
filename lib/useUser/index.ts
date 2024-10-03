'use server'

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type UserDetails = {
    id: number,
    name: string,
    email: string,
    password: string
    role: number,
    created_at: Date
}

export async function useUser() {
    //const [user, setUser] = useState<UserDetails[] | null>(null);

    async function getUserDetails(email: string) {
        let user = await prisma.user.findMany({
            where: {
                email: email
            }
        })
    
        if(!user) {
            return null
        }
    
        const details: UserDetails[] = user.map(u => ({
            id: u.id,
            name: u.name,
            email: u.email,
            password: u.password,
            role: u.role,
            created_at: u.created_at
        }))
        
        return details
    }

    return {
        //user, 
        getUserDetails
    }
}

export async function getUserDetails(email: string) {
    let user = await prisma.user.findMany({
        where: {
            email: email
        }
    })

    if(!user) {
        return null
    }

    const details: UserDetails[] = user.map(u => ({
        id: u.id,
        name: u.name,
        email: u.email,
        password: u.password,
        role: u.role,
        created_at: u.created_at
    }))
    
    return details
}