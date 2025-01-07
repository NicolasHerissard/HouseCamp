import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req: Request, {params}: {params: {id: string}}) {
    try {
        const id = parseInt(params.id);
        if (isNaN(id)) {
            return NextResponse.json({ error: "Id non valide" }, { status: 400 });
        }

        const { name, email } = await req.json();
        await prisma.user.update({
            where: {
                id: id
            },
            data: {
                name: name,
                email: email
            }
        })

        return NextResponse.json({ message: "User updated successfully" });
    }
    catch (err: any) {
        return new NextResponse("Erreur méthode PUT : " + err.message, {
            status: 500
        });
    }
}