import express from 'express';
import { Request, Response } from 'express';

export const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());

export const server = app.listen(port);

app.get('/pokemons-cards', (_req: Request, res: Response) => {
  res.status(200).send('Liste des pokémons');
  });

app.get('/pokemons-cards/:pokemonCardID', (_req: Request, res: Response) => {
  res.status(200).send('Votre pokémon porte le numéro :');
  });

app.post('/pokemons-cards', (_req: Request, res: Response) => {
  res.send(`Le pokémon enregistrer est  ${_req.body.name}`);
  });


export function stopServer() {
  server.close();
}
