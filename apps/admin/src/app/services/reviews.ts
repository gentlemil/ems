import { Review } from '@prisma/client';
import { api } from './config';

export const reviewsList = async () => {
  try {
    const response = await api.get<{ reviews: Review[] }>('/reviews');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching reviews');
  }
};
