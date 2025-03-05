import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const postUsers = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
         res.status(400).json({ message: "Email et mot de passe sont requis." });
    }

    try {
        const existingUser = await prisma.users.findUnique({
            where: { email: email },
        });

        if (existingUser) {
             res.status(400).json({ message: "L'email est déjà utilisé." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.users.create({
            data: {
                email: email,
                password: hashedPassword,
            },
        });

         res.status(201).json({ message: "Utilisateur créé", user: newUser });
    } catch (error) {
        console.error("Erreur de base de données :", error);
         res.status(500).json({ message: "Erreur interne du serveur." });
    }
};
