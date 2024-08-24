import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
        return new NextResponse("Erreur api register : " + err.message, {
            status: 500
        });
    }
}