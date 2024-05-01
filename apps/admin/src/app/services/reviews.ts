import { Review } from '@prisma/client';
import { api } from './config';

export enum Sentiment {
  POSITIVE = 'POSITIVE',
  NEUTRAL = 'NEUTRAL',
  NEGATIVE = 'NEGATIVE',
}

export const reviewsStats = async () => {
  try {
    const response = await api.get<any>('/reviews/statistics');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching reviews stats');
  }
};

export const reviewsList = async () => {
  try {
    const response = await api.get<{ reviews: Review[] }>('/reviews');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching reviews');
  }
};

export const dashboardReviewsList = async () => {
  try {
    const response = await api.get<{ reviews: Review[] }>('/reviews?limit=3');
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

// todo: in progress
export const modifyReviewSentiment = async (id: string, value: Sentiment) => {
  try {
    const response = await api.patch(`/reviews/${id}/sentiment`, { value });
    return { data: response.data, status: response.status };
  } catch (error) {
    throw new Error('Error modifying review sentiment');
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
