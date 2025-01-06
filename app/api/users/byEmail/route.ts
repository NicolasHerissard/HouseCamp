import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const {searchParams} = new URL(req.url)
        const email = searchParams.get('email')

        if(!email) {
            return NextResponse.json({error: 'Email non fourni'}, {status: 400})
        }

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (!user) {
            return NextResponse.json({ message: 'Utilisateur non trouvé' }, { status: 404 });
        }

        return NextResponse.json(user, { status: 200 });
    }
    catch (err: any) {
        console.error("Erreur lors de la récupération des données : " + err.message);
    }
}