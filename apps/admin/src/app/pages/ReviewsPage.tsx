import { useQuery } from '@tanstack/react-query';
import {
  reviewsList,
  modifyReviewConfirmation,
  deleteReview,
} from '../services/reviews';
import { Header } from '@ems/common-ui';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ReviewsPage = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['reviews'],
    queryFn: reviewsList,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.log(error.message);
    return <p>Error</p>;
  }

  const handleConfirmation =
    (id: string) => async (_event: React.MouseEvent<HTMLButtonElement>) => {
      await modifyReviewConfirmation(id);
      await refetch();
    };

  const handleDeleteReview =
    (id: string) => async (_event: React.MouseEvent<HTMLButtonElement>) => {
      await deleteReview(id);
      await refetch();
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
                data.reviews.map((review) => (
                  <tr key={review.id} className="odd:bg-white  even:bg-gray-50">
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

                    <td className="px-6 py-4">
                      <div className="col-span-2 flex justify-center items-center gap-4">
                        <button onClick={handleConfirmation(review.public_id)}>
                          <FontAwesomeIcon icon={['fas', 'eye']} />
                        </button>

                        <button onClick={handleDeleteReview(review.public_id)}>
                          <FontAwesomeIcon icon={['fas', 'trash']} />
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