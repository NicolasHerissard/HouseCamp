import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { PropertiesImage } from "@/lib/db/models/propertiesImage";
import { Buffer } from "buffer";

const prisma = new PrismaClient();

export async function POST(req: Request) {

    try {
        const { property_id, image } = await req.json();
        
        const newImage = await prisma.propertiesImage.create({
            data: {
                property_id: property_id,
                image: image,
            }
        })

        const img: PropertiesImage = {
            id: newImage.id,
            property_id: newImage.property_id,
            image: newImage.image,
            created_at: newImage.created_at,
        }

        return NextResponse.json(img);
    }
    catch (err: any) {
        return new NextResponse("Erreur méthode POST : " + err.message, {
            status: 500
        });
    }
}