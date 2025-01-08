import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { user_id, property_id, check_in_date, check_out_date, total_price } = await req.json();
        
        const bookings = await prisma.bookings.create({
            data: {
                user_id: user_id,
                property_id: property_id,
                check_in_date: check_in_date,
                check_out_date: check_out_date,
                total_price: total_price,
                created_at: new Date()
            }
        })

        return NextResponse.json(bookings);
    }
    catch (err: any) {
        console.error("Erreur API:", err.message);
        return {
            error: err.message
        }
    }
}