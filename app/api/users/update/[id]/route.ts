import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client";
import { UserDetails } from "@/lib/useUser";

const prisma = new PrismaClient();

export async function PUT(req: Request, {params}: {params: {id: string}}) {
    try {
        const id = parseInt(params.id);
        if (isNaN(id)) {
            return NextResponse.json({ error: "Id non valide" }, { status: 400 });
        }

        const { name, email } = await req.json();
        let user = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                name: name,
                email: email
            }
        })

        let currentUser: UserDetails = {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role,
            created_at: user.created_at
        }

        return NextResponse.json(currentUser);
    }
    catch (err: any) {
        return new NextResponse("Erreur méthode PUT : " + err.message, {
            status: 500
        });
    }
}