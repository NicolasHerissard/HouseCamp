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
                },
                user: {
                    select: {
                        name: true,
                        email: true,
                    }
                },
                propertiesImage: true
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
            })) || [],
            user: properties?.user,
            propertiesImage: properties?.propertiesImage.map((image) => ({
                id: image.id,
                property_id: image.property_id,
                image: image.image,
                created_at: image.created_at,
            }))
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

export async function PUT(req: Request, { params }: { params: { id: string } }) {

    try {
        const id = parseInt(params.id, 10);
        const { title, description, city, country, address, price, max_guests } = await req.json();

        if (isNaN(id)) {
            return NextResponse.json({ error: 'Id non valide' }, { status: 400 });
        }

        let updateProperties = await prisma.properties.update({
            data: {
                title: title,
                description: description,
                city: city,
                country: country,
                address: address,
                price: parseFloat(price),
                max_guests: parseInt(max_guests),
            },
            where: {
                id: id,
            }
        })

        return NextResponse.json(updateProperties);
    }
    catch (err: any) {
        console.error("Erreur lors de la modification des propriétés :", err.message);
        return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
    }
}