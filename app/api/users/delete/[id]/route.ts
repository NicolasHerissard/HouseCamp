import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id);
        if (isNaN(id)) {
            return NextResponse.json({ error: "Id non valide" }, { status: 400 });
        }
        
        await prisma.user.delete({
            where: {
                id: id
            }
        })

        // Delete the user from the database
        return NextResponse.json({ message: "User deleted successfully" });
    }
    catch (err: any) {
        return new NextResponse("Erreur méthode DELETE : " + err.message, {
            status: 500
        });
    }
}