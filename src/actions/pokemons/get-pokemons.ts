import React from 'react';
import {Pokemon} from '../../domain/entities/pokemon';
import {pokeApi} from '../../config/api/pokeApi';
import {
  PokeAPIPaginatedResponse,
  PokeAPIPokemon,
} from '../../infrastructure/interfaces/pokeApi.interface';
import {PokemonMapper} from '../../infrastructure/mappers/pokemon.mapper';

export const getPokemons = async (
  page: number,
  limit: number = 20,
): Promise<Pokemon[]> => {
  try {
    const url = `/pokemon?limit=${limit}&offset=${page * limit}`;

    const {data} = await pokeApi.get<PokeAPIPaginatedResponse>(url);

    const pokemonPromises = data.results.map(info =>
      pokeApi.get<PokeAPIPokemon>(info.url),
    );

    const pokeApiPokemons = await Promise.all(pokemonPromises);

    // ✅ Aquí está la corrección:
    const pokemons = await Promise.all(
      pokeApiPokemons.map(item =>
        PokemonMapper.pokeApiPokemonToEntity(item.data),
      ),
    );

    console.log(pokemons); // ahora verás objetos planos y no promesas
    return pokemons;
  } catch (error) {
    console.error('Error fetching Pokémons:', error);
    return [];
  }
};
