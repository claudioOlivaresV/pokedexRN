import React from 'react';
import {pokeApi} from '../../config/api/pokeApi';
import {PokeAPIPokemon} from '../../infrastructure/interfaces/pokeApi.interface';
import {Pokemon} from '../../domain/entities/pokemon';
import {PokemonMapper} from '../../infrastructure/mappers/pokemon.mapper';

export const getPokemonById = async (id: number): Promise<Pokemon> => {
  try {
    const {data} = await pokeApi.get<PokeAPIPokemon>(`pokemon/${id}`);

    const pokemon = await PokemonMapper.pokeApiPokemonToEntity(data);
    return pokemon;
  } catch (error) {
    console.error('Error fetching Pokémons:', error);
    return [];
  }
};
