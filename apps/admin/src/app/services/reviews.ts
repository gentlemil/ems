import { Review } from '@prisma/client';
import { api } from './config';

export const reviewsStats = async (params: any) => {
  console.log('params', params);

  try {
    // const response = await api.get<{ reviews: Review[] }>('/reviews/stats');
    // return response.data;
    const data = {
      stats: {
        positive: 100,
        neutral: 100,
        negative: 100,
        total: 300,
      },
    };
    return data;
  } catch (error) {
    throw new Error('Error fetching reviews stats');
  }
};

export const reviewsList = async (params: any) => {
  console.log('params', params);

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
