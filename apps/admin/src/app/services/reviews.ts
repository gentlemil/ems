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

export const modifyReviewConfirmation = async (id: string) => {
  try {
    const response = await api.patch(`/reviews/${id}/confirm`);
    return { data: response.data, status: response.status };
  } catch (error) {
    throw new Error('Error modifying review confirmation');
  }
};

export const deleteReview = async (id: string) => {
  try {
    const response = await api.delete(`/reviews/${id}`);
    return { status: response.status };
  } catch (error) {
    throw new Error('Error deleting review');
  }
};
