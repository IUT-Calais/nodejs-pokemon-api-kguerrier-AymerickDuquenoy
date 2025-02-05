import{ Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();




export const getPokemon = async (_req: Request, res: Response)=>{
   const ListPokemon = await prisma.pokemonCard.findMany();
   res.status(200).send(ListPokemon)

}

export const getPokemonId = async (req: Request, res: Response)=>{
    const { id } = req.params;

    try{
        const Pokemon = await prisma.pokemonCard.findUnique({
            where : {id: Number(id)},
        });
        if(!Pokemon){
            res.status(404).send('Pokémon non trouvé');
            return;
        }
        res.status(200).send(Pokemon)
    
    } catch(error){
        res.status(500).json({error:'Une erreur est survenue'});
    }
   
}


export const postPokemon = async (req: Request, res: Response) => {
    const { name, pokedexId, lifePoints, size, weight, typeID,imageUrl } = req.body;

    try {
        const newPokemon = await prisma.pokemonCard.create({
            data: {
                name: name,
                pokedexId: pokedexId,
                lifePoints: lifePoints,
                size: size,
                weight: weight,
                typeID: typeID,
                imageUrl: imageUrl,
            },
        });

        res.status(201).json({ message: "Pokémon créé", pokemon: newPokemon });
    } catch (error) {
        console.error("Database error:", error);
    }
};

