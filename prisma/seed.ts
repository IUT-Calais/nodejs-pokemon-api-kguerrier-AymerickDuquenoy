import { PrismaClient } from '@prisma/client';
import { connect } from 'http2';

const prisma = new PrismaClient();

async function main() {
  await prisma.pokemonCard.deleteMany();
  await prisma.type.deleteMany();
  await prisma.type.createMany({
    data: [
      {id:1, name: 'Normal' },
      {id:2,  name: 'Fire' },
      {id:3,  name: 'Water' },
      { id:4, name: 'Grass' },
      {id:5,  name: 'Electric' },
      {id:6,  name: 'Ice' },
      {id:7,  name: 'Fighting' },
      {id:8,  name: 'Poison' },
      { id:9, name: 'Ground' },
      {id:10,  name: 'Flying' },
      { id:11, name: 'Psychic' },
      { id:12, name: 'Bug' },
      { id:13, name: 'Rock' },
      {id:14,  name: 'Ghost' },
      {id:15, name: 'Dragon' },
      {id:16,  name: 'Dark' },
      {id:17,  name: 'Steel' },
      {id:18,  name: 'Fairy' },
    ],
  });


 
  await prisma.pokemonCard.createMany({
    data:[
      {name: 'Bulbizarre',pokedexId : 1, lifePoints : 39,typeID : 4 ,size : 70,weight : 6.9},
      {name: 'Salameche',pokedexId : 4, lifePoints : 39,typeID : 2, size :60, weight : 8.5},
      {name: 'Carapuce',pokedexId : 7, lifePoints : 39,typeID : 3, size : 50, weight : 9.0 },

      {name: 'Herbizarre',pokedexId : 2, lifePoints : 60,typeID : 4 , size : 100, weight : 13 },
      {name: 'Reptincel',pokedexId : 5, lifePoints : 60,typeID : 2, size : 110, weight : 19 },
      {name: 'Carabaffe',pokedexId : 8, lifePoints : 60,typeID :3 , size : 100, weight : 22.5 },

      {name: 'Florizarre',pokedexId : 3, lifePoints : 80,typeID : 4, size :200 , weight : 100  },
      {name: 'Dracaufeu',pokedexId : 6, lifePoints : 80,typeID : 2, size : 170, weight : 90.5 },
      {name: 'Tortank',pokedexId : 9, lifePoints : 80,typeID : 3, size : 160, weight : 85.5 },
    ]
  });
  
  await prisma.users.createMany({
    data:[
      {email: "admin@gmail.com",password: "admin"}
    ]
  });
  console.log('Seed completed!');
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
