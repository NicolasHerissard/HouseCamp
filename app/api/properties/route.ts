import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { Equipment } from "@/lib/db/models/equipment";
import { NextApiRequest } from "next";
import { PropertiesImage } from "@/lib/db/models/propertiesImage";

const prisma = new PrismaClient();

export type Property = {
    id?: number,
    user_id?: number,
    title?: string,
    description?: string,
    city?: string,
    country?: string,
    address?: string,
    price?: number,
    max_guests?: number,
    created_at?: Date,
    equipments?: Equipment[],
    user?: {
        name: string,
        email: string
    },
    propertiesImage?: PropertiesImage[],
}

export async function GET(req: Request) {
    try {

        const city = req.url.split('=')[1]
        // const sortDirection = req.url.split('=')[2]
        // console.log(sortDirection)

        const allProperty = await prisma.properties.findMany({
            where: {
                city: {
                    contains: city
                }
            },
            orderBy: {
                created_at: 'desc'
            }
        })

        const properties: Property[] = allProperty.map(p => ({
            id: p.id,
            user_id: p.user_id,
            title: p.title,
            description: p.description,
            city: p.city,
            country: p.country,
            address: p.address,
            price: p.price,
            max_guests: p.max_guests,
            created_at: p.created_at,
        }))

        return NextResponse.json(properties)
    }
    catch (err: any) {
        return new NextResponse("Erreur méthode GET : " + err.message);
    }
}

export async function POST(req: Request) {
    try {
        
        const { user_id, title, description, city, country, address, price, max_guests } = await req.json();
        const newProperty = await prisma.properties.create({
            data: {
                user_id: user_id,
                title: title,
                description: description,
                city: city,
                country: country,
                address: address,
                price: parseFloat(price),
                max_guests: parseInt(max_guests),
            }
        })

        return NextResponse.json(newProperty);
    }
    catch (err: any) {
        return new NextResponse("Erreur méthode POST : " + err.message, {
            status: 500
        });
    }
}