import { useQuery } from '@tanstack/react-query';

import { Header } from '@ems/common-ui';
import { reviewsList } from '../services/reviews';

import ReviewTableRow from '../components/ReviewTableRow';
import Spinner from '../components/Spinner';

export const ReviewsPage = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['reviews'],
    queryFn: reviewsList,
  });

  if (error) {
    return <p>Error</p>;
  }

  const refetchData = async () => {
    await refetch();
  };

  return (
    <div className="container mx-auto px-4">
      <Header>Reviews</Header>

      {isLoading ? (
        <Spinner loading={isLoading} />
      ) : (
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
                  Created
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
                  data.reviews.map((review) => (
                    <ReviewTableRow
                      key={review.id}
                      review={review}
                      refetch={refetchData}
                    />
                  ))}
              </tbody>
            )}
          </table>
        </div>
      )}
    </div>
  );
};
