import express from 'express';
import { Request, Response } from 'express';
import { pokemonRouter } from './pokemon_cards/pokemonCards.router';

export const app = express();
const port = process.env.PORT || 3000;




export const server = app.listen(port);
app.use(express.json());

app.use('/pokemon-cards',pokemonRouter);




export function stopServer() {
  server.close();
}
