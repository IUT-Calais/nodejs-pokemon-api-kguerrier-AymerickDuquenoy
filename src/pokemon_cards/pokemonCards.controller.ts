import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import prisma from '../client';

// Get all Pokémon cards
export const getPokemon = async (_req: Request, res: Response) => {
    try {
        const ListPokemon = await prisma.pokemonCard.findMany();
        res.status(200).send(ListPokemon);
    } catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
};

// Get Pokémon by ID
export const getPokemonId = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const Pokemon = await prisma.pokemonCard.findUnique({
            where: { id: Number(id) },
        });

        if (!Pokemon) {
             res.status(404).send('Pokemon not found');
             return;
        }
        else{
             res.status(200).send(Pokemon);
        }

       
    } catch (error) {
        res.status(500).send({ error: 'Pokémon non trouvé' });
    }
};

// Create a new Pokémon
export const postPokemon = async (req: Request, res: Response) => {
    const { name, pokedexId, lifePoints, size, weight, typeID, imageUrl } = req.body;

    // Validation checks
    if (!name || !pokedexId || !lifePoints || !size || !weight || !typeID || !imageUrl) {
         res.status(400).send({ error: 'Un ou plusieurs champs requis sont vides' });
    }

    try {
        // Check if typeID exists in the types table
        const typeExists = await prisma.type.findUnique({
            where: { id: typeID },
        });

        if (!typeExists) {
             res.status(400).send({ error: 'L\'ID de type renseigné n\'existe pas' });
        }

        // Check for duplicate name or pokedexId
        const existingPokemon = await prisma.pokemonCard.findFirst({
            where: { OR: [{ name }, { pokedexId }] },
        });

        if (existingPokemon) {
             res.status(400).send({ error: 'Un doublon de data existe (nom ou pokedexId)' });
        }

        // Create new Pokémon card
        const newPokemon = await prisma.pokemonCard.create({
            data: {
                name,
                pokedexId,
                lifePoints,
                size,
                weight,
                typeID,
                imageUrl,
            },
        });

        res.status(201).send({ message: 'Pokémon créé', pokemon: newPokemon });
    } catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
};

// Update an existing Pokémon
export const patchPokemon = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, pokedexId, lifePoints, size, weight, typeID, imageUrl } = req.body;

    if (!name || !pokedexId || !lifePoints || !size || !weight || !typeID || !imageUrl) {
         res.status(400).send({ error: 'Un ou plusieurs champs requis sont vides' });
    }

    try {
        // Check if typeID exists in the types table
        const typeExists = await prisma.type.findUnique({
            where: { id: typeID },
        });

        if (!typeExists) {
             res.status(400).send({ error: 'L\'ID de type renseigné n\'existe pas' });
        }

        // Check for duplicate name or pokedexId
        const existingPokemon = await prisma.pokemonCard.findFirst({
            where: { OR: [{ name }, { pokedexId }] },
        });

        if (existingPokemon && existingPokemon.id !== Number(id)) {
             res.status(400).send({ error: 'Un doublon de data existe (nom ou pokedexId)' });
        }

        // Update the Pokémon card
        const modifiPokemon = await prisma.pokemonCard.update({
            where: { id: Number(id) },
            data: {
                name,
                pokedexId,
                lifePoints,
                size,
                weight,
                typeID,
                imageUrl,
            },
        });

        res.status(200).send({ message: 'Pokémon modifié', pokemon: modifiPokemon });
    } catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
};

// Delete a Pokémon by ID
export const deletePokemon = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const pokemonExists = await prisma.pokemonCard.findUnique({
            where: { id: Number(id) },
        });

        if (!pokemonExists) {
             res.status(404).send({ error: 'Pokémon non trouvé' });
        }

        // Delete the Pokémon card
        await prisma.pokemonCard.delete({
            where: { id: Number(id) },
        });

        res.status(200).json({ message: 'Pokémon supprimé' });
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue' });
    }
};
