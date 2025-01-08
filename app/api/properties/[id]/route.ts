import { NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";
import { Property } from '../route';

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id, 10);

        if (isNaN(id)) {
            return NextResponse.json({ error: 'Id non valide' }, { status: 400 });
        }

        const properties = await prisma.properties.findUnique({
            select: {
                id: true,
                user_id: true,
                title: true,
                description: true,
                city: true,
                country: true,
                address: true,
                price: true,
                max_guests: true,
                created_at: true,
                EquipmentProperties: {
                    select: {
                        id: true,
                        property_id: true,
                        equipment_id: true,
                        equipment: {
                            select: {
                                id: true,
                                name: true,
                            }
                        }
                    }
                }
            },
            where: {
                id: id,
            },
        });

       const property: Property = {
            id: properties?.id,
            user_id: properties?.user_id,
            title: properties?.title,
            description: properties?.description,
            city: properties?.city,
            country: properties?.country,
            address: properties?.address,
            price: properties?.price,
            max_guests: properties?.max_guests,
            created_at: properties?.created_at,
            equipments: properties?.EquipmentProperties?.map(e => ({
                id: e.equipment_id,
                name: e.equipment?.name
            })) || []
       }

        return NextResponse.json(property);

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