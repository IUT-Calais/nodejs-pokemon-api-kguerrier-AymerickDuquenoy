import { Router } from 'express';
import { getPokemon, getPokemonId  } from './pokemonCards.controller';

export const pokemonRouter = Router();

pokemonRouter.get('/', getPokemon);
pokemonRouter.get('/:id',getPokemonId);