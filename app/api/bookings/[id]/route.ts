import { NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { id: string } }) {

    try {
        const id = params.id

        const booking = await prisma.bookings.findUnique({
            where: {
                id: parseInt(id)
            }
        })
    
        return NextResponse.json(booking)
    }
    catch (err: any) {
        console.error("Erreur API:", err.message);
        return NextResponse.json({
            error: err.message
        })
    }
}