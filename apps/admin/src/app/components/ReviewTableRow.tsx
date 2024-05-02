import { Review } from '@prisma/client';

import { format } from 'date-fns';

import { FaRegTrashAlt } from 'react-icons/fa';
import { MdPublishedWithChanges } from 'react-icons/md';
import {
  deleteReview,
  modifyReviewConfirmation,
  modifyReviewSentiment,
} from '../services/reviews';
import { toast } from 'react-toastify';

const ReviewTableRow = ({
  review,
  refetch,
}: {
  review: Review;
  refetch: () => Promise<unknown>;
}) => {
  const handleConfirmation = async (id: string) => {
    await modifyReviewConfirmation(id);

    toast.success('Review confirmed successfully!');
    await refetch();
  };

  const handleDeleteReview = async (id: string) => {
    const confirm = window.confirm(
      'Are you sure you want to delete this review?'
    );
    if (!confirm) return null;

    await deleteReview(id);

    toast.success('Review deleted successfully!');
    await refetch();
  };

  // TODO
  const handleSentiment = async (id: string) => {
    // await modifyReviewSentiment();
    await refetch();
  };

  return (
    <tr key={review.id} className="odd:bg-white  even:bg-gray-50">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {review.author_name}
      </th>

      <td className="px-6 py-4">{review.content}</td>

      <td className="px-6 py-4">{format(review.created_at, 'dd.MM.yyyy')}</td>

      <td
        className={`px-6 py-4 text-center ${
          review.is_confirmed ? 'text-green-500' : 'text-red-500'
        }`}
      >
        {review.is_confirmed ? 'Yes' : 'No'}
      </td>

      <td className="px-6 py-4 text-center">{review.sentiment || '-'}</td>

      <td className="px-6 py-4">
        <div className="col-span-2 flex justify-center items-center gap-4">
          <button onClick={() => handleConfirmation(review.public_id)}>
            <MdPublishedWithChanges className="w-5 h-5 hover:scale-110 transition-all" />
          </button>

          <button onClick={() => handleDeleteReview(review.public_id)}>
            <FaRegTrashAlt className="w-5 h-5 hover:scale-110 transition-all" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ReviewTableRow;
