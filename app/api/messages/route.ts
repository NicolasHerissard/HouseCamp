import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Messages } from "@/lib/db/models/messages";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const messages = await prisma.messages.findMany()
        return NextResponse.json(messages)
    }
    catch (err: any) {
        return new NextResponse("Erreur méthode GET : " + err.message);
    }
}

export async function POST(req: Request) {
    try {
        const { sender_id, receiver_id, content } = await req.json();
        const newMessage = await prisma.messages.create({
            data: {
                sender_id: sender_id,
                receiver_id: receiver_id,
                content: content,
                created_at: new Date(),
            }
        })

        const newMsg: Messages = {
            id: newMessage.id,
            sender_id: newMessage.sender_id,
            receiver_id: newMessage.receiver_id,
            content: newMessage.content,
            created_at: newMessage.created_at,
        }

        return NextResponse.json(newMsg);
    }
    catch (err: any) {
        return new NextResponse("Erreur méthode POST : " + err.message, {
            status: 500
        });
    }
}