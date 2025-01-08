import { NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";
import { Booking } from '@/lib/db/models/booking';

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { id: string } }) {

    try {
        const user_id = params.id

        const bookings = await prisma.bookings.findMany({
            select: {
                id: true,
                check_in_date: true,
                check_out_date: true,
                total_price: true,
                property: {
                    select: {
                        id: true,
                        title: true,
                        price: true,
                    }
                },
            },
            where: {
                user_id: parseInt(user_id)
            }
        })

        const booking: Booking[] = bookings.map(b => ({
            id: b.id,
            check_in_date: b.check_in_date,
            check_out_date: b.check_out_date,
            total_price: b.total_price,
            property: {
                id: b.property.id,
                title: b.property.title,
                price: b.property.price
            }
        }))
    
        return NextResponse.json(booking)
    }
    catch (err: any) {
        console.error("Erreur API:", err.message);
        return NextResponse.json({
            error: err.message
        })
    }
}