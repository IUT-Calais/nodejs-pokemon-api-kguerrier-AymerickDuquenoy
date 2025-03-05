import { Router } from 'express';
import { getPokemon, getPokemonId, postPokemon,patchPokemon, deletePokemon } from './pokemonCards.controller'; // Ensure correct path
import { verifyJWT } from '../common/jwt.middleware';

export const pokemonRouter = Router();

pokemonRouter.get('/', getPokemon);
pokemonRouter.get('/:id', getPokemonId);
pokemonRouter.post('/',verifyJWT, postPokemon);
pokemonRouter.patch('/:id',verifyJWT, patchPokemon);
pokemonRouter.delete('/:id',verifyJWT, deletePokemon);
