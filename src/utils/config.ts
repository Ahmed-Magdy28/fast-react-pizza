import type { cartInitialStateType, userInitialStateType } from '../types';

export const API_Restaurant_URL = 'https://react-fast-pizza-api.jonas.io/api';
export const API_Geocoding_URL =
   'https://api.bigdatacloud.net/data/reverse-geocode-client';

export const userInitialState: userInitialStateType = {
   username: '',
   status: 'idle',
   error: '',
   position: null,
   address: undefined,
};
export const cartInitialState: cartInitialStateType = {
   cart: [],
};
