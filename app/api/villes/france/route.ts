import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const allCity = await prisma.ville.findMany({
            select: {
                villeNom: true,
                villeCodePostal: true,
            }
        });

        return NextResponse.json(allCity);
    }
    catch (err: any) {
        return new NextResponse("Erreur méthode GET : " + err.message, {
            status: 500
        });
    }
}