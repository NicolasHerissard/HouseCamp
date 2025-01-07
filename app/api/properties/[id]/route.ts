import { NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id, 10);

        if (isNaN(id)) {
            return NextResponse.json({ error: 'Id non valide' }, { status: 400 });
        }

        const properties = await prisma.properties.findUnique({
            where: {
                id: id,
            },
        });

        return NextResponse.json(properties);
    } catch (err: any) {
        console.error("Erreur lors de la récupération des propriétés :", err.message);
        return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id, 10);

        if (isNaN(id)) {
            return NextResponse.json({ error: 'Id non valide' }, { status: 400 });
        }

        await prisma.properties.delete({
            where: {
                id: id,
            },
        });

        return NextResponse.json({ message: 'Propriété supprimée' });
    }
    catch (err: any) {
        console.error("Erreur lors de la suppression des propriétés :", err.message);
        return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
    }
}