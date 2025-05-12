import express from 'express';
import { Request, Response } from 'express';
import { pokemonRouter } from './pokemon_cards/pokemonCards.router';
import { userRoute } from './users/users.router';

import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

export const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Charger la documentation Swagger
const swaggerDocument = YAML.load(path.join(__dirname, './swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/pokemon-cards', pokemonRouter);
app.use('/users', userRoute);

export const server = app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
  console.log(`Documentation Swagger disponible sur http://localhost:${port}/api-docs`);
});

export function stopServer() {
  server.close();
}
