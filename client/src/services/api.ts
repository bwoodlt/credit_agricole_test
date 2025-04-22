import axios from 'axios';
import { Item } from '../types';

const API_URL = 'http://localhost:5210/api';

export const fetchItems = async (): Promise<Item[]> => {
  try {
    const response = await axios.get<Item[]>(`${API_URL}/items`);
    return response.data;
  } catch (error) {
    console.error('Error fetching items:', error);
    return [];
  }
};

export const fetchPriceUpdates = async (): Promise<Item[]> => {
  try {
    const response = await axios.get<Item[]>(`${API_URL}/items/update`);
    return response.data;
  } catch (error) {
    console.error('Error fetching price updates:', error);
    return [];
  }
};
