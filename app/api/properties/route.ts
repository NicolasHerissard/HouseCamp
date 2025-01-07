import { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export type Property = {
    id: number,
    user_id: number,
    title: string,
    description: string,
    city: string,
    country: string,
    price: Decimal,
    max_guests: number,
    created_at: Date,
}

export async function GET() {
    try {
        const allProperty = await prisma.properties.findMany({
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
        
        const { user_id, title, description, city, country, price, max_guests } = await req.json();
        const newProperty = await prisma.properties.create({
            data: {
                user_id: user_id,
                title: title,
                description: description,
                city: city,
                country: country,
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