import { useQuery } from '@tanstack/react-query';

import { Header } from '@ems/common-ui';
import {
  reviewsList,
  modifyReviewConfirmation,
  deleteReview,
  modifyReviewSentiment,
  Sentiment,
} from '../services/reviews';

import { FaRegTrashAlt } from 'react-icons/fa';
import { MdPublishedWithChanges } from 'react-icons/md';
import { useState } from 'react';

export const ReviewsPage = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['reviews'],
    queryFn: reviewsList,
  });
  const [selectedSentiment, setSelectedSentimentValue] = useState(''); // todo: in progress

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error</p>;
  }

  const handleConfirmation = (id: string) => async () => {
    await modifyReviewConfirmation(id);
    await refetch();
  };

  const handleDeleteReview = (id: string) => async () => {
    await deleteReview(id);
    await refetch();
  };

  // todo: in progress
  const handleReviewSentiment = (id: string, value: Sentiment) => async () => {
    await modifyReviewSentiment(id, value);
    await refetch();
  };

  const handleChange = (event: any) => {
    setSelectedSentimentValue(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div className="container mx-auto px-4">
      <Header>Reviews</Header>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                Name
              </th>

              <th scope="col" className="px-6 py-3 text-center">
                Review
              </th>

              <th scope="col" className="px-6 py-3 text-center">
                Confirmation
              </th>

              <th scope="col" className="px-6 py-3 text-center">
                Sentiment
              </th>

              <th scope="col" className="px-6 py-3 text-center">
                Options
              </th>
            </tr>
          </thead>

          {(!data || data?.reviews.length === 0) && (
            <tbody>
              <p className="p-4 italic">no results...</p>
            </tbody>
          )}

          {(!data || data?.reviews.length > 0) && (
            <tbody>
              {data?.reviews &&
                data.reviews.map((review, index) => (
                  <tr key={index} className="odd:bg-white  even:bg-gray-50">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {review.author_name}
                    </th>

                    <td className="px-6 py-4">{review.content}</td>

                    <td
                      className={`px-6 py-4 text-center ${
                        review.is_confirmed ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {review.is_confirmed ? 'Yes' : 'No'}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <div>
                        <label htmlFor="sentiment-select"></label>
                        <select
                          id="sentiment-select"
                          value={selectedSentiment}
                          onChange={handleChange}
                        >
                          <option value="">Select...</option>
                          <option value="POSITIVE">Positive</option>
                          <option value="NEUTRAL">Neutral</option>
                          <option value="NEGATIVE">Negative</option>
                        </select>
                      </div>

                      <button
                        onClick={handleReviewSentiment(
                          review.public_id,
                          'POSITIVE' as Sentiment
                        )}
                      >
                        pos
                      </button>

                      <button
                        onClick={handleReviewSentiment(
                          review.public_id,
                          'NEUTRAL' as Sentiment
                        )}
                      >
                        neu
                      </button>

                      <button
                        onClick={handleReviewSentiment(
                          review.public_id,
                          'NEGATIVE' as Sentiment
                        )}
                      >
                        neg
                      </button>
                    </td>

                    <td className="px-6 py-4">
                      <div className="col-span-2 flex justify-center items-center gap-4">
                        <button onClick={handleConfirmation(review.public_id)}>
                          <MdPublishedWithChanges className="w-5 h-5 hover:scale-110 transition-all" />
                        </button>

                        <button onClick={handleDeleteReview(review.public_id)}>
                          <FaRegTrashAlt className="w-5 h-5 hover:scale-110 transition-all" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};
