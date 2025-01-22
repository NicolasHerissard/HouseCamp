import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client";
import { UserDetails } from "@/lib/useUser";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const allUsers = await prisma.user.findMany();

        const users: UserDetails[] = allUsers.map(u => ({
            id: u.id,
            name: u.name,
            email: u.email,
            password: u.password,
            role: u.role,
            created_at: u.created_at
        }))

        return NextResponse.json(users);
    }
    catch (err: any) {
        return new NextResponse("Erreur méthode GET : " + err.message);
    }
}

export async function POST(request: Request) {
    try {
        const { name, email, password, role } = await request.json();
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password,
                role
            }
        })

        return NextResponse.json(newUser);
    }
    catch(err: any) {
        return new NextResponse("Erreur méthode POST : " + err.message, {
            status: 500
        });
    }
}