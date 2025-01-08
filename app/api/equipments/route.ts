import { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";
import { Equipment } from "@/lib/db/models/equipment";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const allEquipment = await prisma.equipments.findMany({
            select: {
                id: true,
                name: true,
            }
        })

        const equipments: Equipment[] = allEquipment.map(e => ({
            id: e.id,
            name: e.name,
        }))

        return NextResponse.json(equipments)
    }
    catch (err: any) {
        return new NextResponse("Erreur méthode GET : " + err.message);
    }
}