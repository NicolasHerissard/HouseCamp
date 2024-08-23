import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {

        const { email, password } = await req.json();

        const user = await prisma.user.findFirst({
            where: {
                email: email,
                password: password
            }
        })

        return NextResponse.json(user);
    }
    catch (err: any) {
        return new NextResponse("Erreur api login : " + err.message);
    }
}