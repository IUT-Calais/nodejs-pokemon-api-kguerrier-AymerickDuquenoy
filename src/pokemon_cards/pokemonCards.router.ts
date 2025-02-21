import { Router } from 'express';
import { getPokemon, getPokemonId, postPokemon,patchPokemon, deletePokemon } from './pokemonCards.controller'; // Ensure correct path

export const pokemonRouter = Router();

pokemonRouter.get('/', getPokemon);
pokemonRouter.get('/:id', getPokemonId);
pokemonRouter.post('/', postPokemon);
pokemonRouter.patch('/:id', patchPokemon);
pokemonRouter.delete('/:id', deletePokemon);
