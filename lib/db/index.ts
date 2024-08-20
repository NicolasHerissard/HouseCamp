import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function connect() {
    try {
       await prisma.$connect();
    }
    catch (err: any) {
        console.error("Erreur de connexion à la base de donnée : " + err.message);
    }
}