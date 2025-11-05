import React from 'react';
import {Pokemon} from '../../domain/entities/pokemin';
import {pokeApi} from '../../config/api/pokeApi';
import { PokeAPIPaginatedResponse } from '../../infrastructure/interfaces/pokeApi.interface';

export const getPokemons = async (page: number, limit: numeber = 20): Promise<Pokemon[]> => {
  try {
    const url = `/pokemon?limit=${limit}offset=${page * 10}`;
    const {data} = await pokeApi.get<PokeAPIPaginatedResponse>(url);
    console.log(data);
    return [];
  } catch (error) {}
};
