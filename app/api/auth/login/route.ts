import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {

        const { email, password } = await req.json();

        const user = await prisma.user.findFirst({
            where: {
                email: email,
            }
        })

        if (!user) {
            throw new Error("Utilisateur non trouvé");
        }

        let passwordOK = await bcrypt.compare(password, user.password);

        if (!passwordOK) {
            throw new Error("Mot de passe incorrect");
        }

        return NextResponse.json(user, {status: 200});
    }
    catch (err: any) {
        return new NextResponse("Erreur api login : " + err.message, {status: 500});
    }
}