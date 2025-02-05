import { PrismaClient } from '@prisma/client';
import { connect } from 'http2';

const prisma = new PrismaClient();

async function main() {
  await prisma.pokemonCard.deleteMany();
  await prisma.type.deleteMany();
  await prisma.type.createMany({
    data: [
      { name: 'Normal' },
      { name: 'Fire' },
      { name: 'Water' },
      { name: 'Grass' },
      { name: 'Electric' },
      { name: 'Ice' },
      { name: 'Fighting' },
      { name: 'Poison' },
      { name: 'Ground' },
      { name: 'Flying' },
      { name: 'Psychic' },
      { name: 'Bug' },
      { name: 'Rock' },
      { name: 'Ghost' },
      { name: 'Dragon' },
      { name: 'Dark' },
      { name: 'Steel' },
      { name: 'Fairy' },
    ],
  });

  const typeRecords = await prisma.type.findMany();
  const typeMap = Object.fromEntries(typeRecords.map((t) => [t.name, t.id]));
 
  await prisma.pokemonCard.createMany({
    data:[
      {name: 'Bulbizarre',pokedexId : 1, lifePoints : 39,typeID : typeMap['Grass'] ,size : 70,weight : 6.9},
      {name: 'Salameche',pokedexId : 4, lifePoints : 39,typeID : typeMap['Fire'], size :60, weight : 8.5},
      {name: 'Carapuce',pokedexId : 7, lifePoints : 39,typeID : typeMap['Water'], size : 50, weight : 9.0 },

      {name: 'Herbizarre',pokedexId : 2, lifePoints : 60,typeID : typeMap['Grass'] , size : 100, weight : 13 },
      {name: 'Reptincel',pokedexId : 5, lifePoints : 60,typeID : typeMap['Fire'], size : 110, weight : 19 },
      {name: 'Carabaffe',pokedexId : 8, lifePoints : 60,typeID : typeMap['Water'], size : 100, weight : 22.5 },

      {name: 'Florizarre',pokedexId : 3, lifePoints : 80,typeID : typeMap['Grass'], size :200 , weight : 100  },
      {name: 'Dracaufeu',pokedexId : 6, lifePoints : 80,typeID : typeMap['Fire'], size : 170, weight : 90.5 },
      {name: 'Tortank',pokedexId : 9, lifePoints : 80,typeID : typeMap['Water'], size : 160, weight : 85.5 },
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
