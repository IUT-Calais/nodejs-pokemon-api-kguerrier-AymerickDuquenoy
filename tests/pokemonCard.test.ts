import request from 'supertest';
import { app } from '../src';
import { prismaMock } from './jest.setup';

describe('PokemonCard API', () => {
  describe('GET /pokemon-cards', () => {
    it('should fetch all PokemonCards', async () => {
      const mockPokemonCards = [
        {id:38,name: 'Bulbizarre', pokedexId: 1,lifePoints: 39,size:70,weight:6.9,typeID:4,imageUrl:null},
        {id:39,name: 'Salameche', pokedexId: 4,lifePoints: 39,size:60,weight:8.5,typeID:2,imageUrl:null},
        {id:40,name: 'Carapuce', pokedexId: 7,lifePoints: 39,size:50,weight:9,typeID:3,imageUrl:null},
        {id:41,name: 'Herbizarre', pokedexId: 2,lifePoints: 60,size:100,weight:13,typeID:4,imageUrl:null},
        {id:42,name: 'Reptincel', pokedexId: 5,lifePoints: 60,size:110,weight:19,typeID:2,imageUrl:null},

      ];

      prismaMock.pokemonCard.findMany.mockResolvedValue(mockPokemonCards);
      const response = await request(app).get('/pokemon-cards');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockPokemonCards);
    });
  });

  describe('GET /pokemon-cards/:pokemonCardId', () => {
    it('should fetch a PokemonCard by ID', async () => {
      const mockPokemonCard = {id:38,name: 'Bulbizarre', pokedexId: 1,lifePoints: 39,size:70,weight:6.9,typeID:4,imageUrl:null,};
      prismaMock.pokemonCard.findUnique.mockResolvedValue(mockPokemonCard);
      const response = await request(app).get('/pokemon-cards/38');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockPokemonCard);
    });

    it('should return 404 if PokemonCard is not found', async () => {
      prismaMock.pokemonCard.findUnique.mockResolvedValue(null);
      const response = await request(app).get('/pokemon-cards/null');
      expect(response.status).toBe(404);
      expect(response.body).toEqual({error:'Pokemon not found'});
    });
  });

  describe('POST /pokemon-cards', () => {
    it('should create a new PokemonCard', async () => {
      const createdPokemonCard = { 
        id: 1, 
        name: "Bulbizarre",
        pokedexId: 1,
        size: 0.7,
        lifePoints: 45,
        weight: 6.9,
        typeID: 4,
        imageUrl: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png"
      };
  prismaMock.type.findUnique.mockResolvedValue({
        id: 4,
        name: 'Plante',
      });
      prismaMock.pokemonCard.findFirst.mockResolvedValue(null);
      prismaMock.pokemonCard.create.mockResolvedValue(createdPokemonCard);
      
  
      const response = await request(app)
        .post('/pokemon-cards')
        .set('Authorization', 'Bearer mockedToken')
        .send({
          name: "Bulbizarre",
          pokedexId: 1,
          size: 0.7, 
          lifePoints: 45,
          weight: 6.9,
          typeID: 4,
          imageUrl: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
        });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({message: 'Pokémon créé', pokemon:createdPokemonCard}); 
    });

    it('should return an error when typeID does not exist', async () => {
      prismaMock.type.findUnique.mockResolvedValue(null); // type doesn't exist
    
      const response = await request(app)
        .post('/pokemon-cards')
        .set('Authorization', 'Bearer mockedToken')
        .send({
          name: "Bulbizarre",
          pokedexId: 1,
          size: 0.7, 
          lifePoints: 45,
          weight: 6.9,
          typeID: 4,
          imageUrl: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
        });
    
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'L\'ID de type renseigné n\'existe pas' });
    });
    
  });
  

  describe('PATCH /pokemon-cards/:pokemonCardId', () => {
    it('should update an existing PokemonCard', async () => {
      const updatedPokemonCard = { 
        id: 1,
        name: "Bulbizarre",
        pokedexId: 2,
        size: 0.7,
        lifePoints: 45,
        weight: 6.9,
        typeID: 4,
        imageUrl: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png"
      };
  
      // Mocks
      prismaMock.pokemonCard.findUnique.mockResolvedValue({ id: 1,name: "Bulbizarre",
        pokedexId: 1,
        size: 0.7, 
        lifePoints: 45,
        weight: 6.9,
        typeID: 4,
        imageUrl: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png" }); // The card exists
      prismaMock.type.findUnique.mockResolvedValue({ id: 4, name: 'Plante' }); // Valid type
      prismaMock.pokemonCard.update.mockResolvedValue(updatedPokemonCard); // Simulate update
  
      const response = await request(app)
        .patch('/pokemon-cards/1')
        .set('Authorization', 'Bearer mockedToken')
        .send({
          name: "Bulbizarre",
          pokedexId: 2,
          size: 0.7,
          lifePoints: 45,
          weight: 6.9,
          typeID: 4,
          imageUrl: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png"
        });
  
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Pokémon modifié', pokemon:updatedPokemonCard});
    });
  });
  

  describe('DELETE /pokemon-cards/:pokemonCardId', () => {
    it('should delete a PokemonCard', async () => {
      prismaMock.pokemonCard.findUnique.mockResolvedValue({ id: 1,name: "Bulbizarre",
        pokedexId: 1,
        size: 0.7, 
        lifePoints: 45,
        weight: 6.9,
        typeID: 4,
        imageUrl: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png" }); // The card exists
      prismaMock.type.findUnique.mockResolvedValue({ id: 4, name: 'Plante' }); // Valid type
      const response = await request(app)
        .delete('/pokemon-cards/1')
        .set('Authorization', 'Bearer mockedToken');
  
      expect(response.status).toBe(204);
    });
  });
});


