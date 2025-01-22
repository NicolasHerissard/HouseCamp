import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { URL } from "url";
import { Messages } from "@/lib/db/models/messages";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const senderId = searchParams.get('senderId')
        const receiverId = searchParams.get('receiverId')

        if(!senderId || !receiverId) {
            return NextResponse.json(
                { error: 'senderId and receiverId are required' },
                { status: 400 }
            );
        }

        const messages = await prisma.messages.findMany({
            where: {
                OR: [
                    {sender_id: parseInt(senderId), receiver_id: parseInt(receiverId)},
                    {sender_id: parseInt(receiverId), receiver_id: parseInt(senderId)}
                ]
            },
            orderBy: {
                created_at: 'asc'
            }
        })

        const msg: Messages[] = messages.map(m => ({
            id: m.id,
            sender_id: m.sender_id,
            receiver_id: m.receiver_id,
            content: m.content,
            created_at: m.created_at,
        }))

        return NextResponse.json(msg)
    }
    catch (err: any) {
        return new NextResponse("Erreur méthode GET : " + err.message, {
            status: 500
        });
    }
}