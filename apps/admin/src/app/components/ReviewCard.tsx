import { useState } from 'react';
import { Review } from '@prisma/client';
import { format } from 'date-fns';
import { FaRegUserCircle } from 'react-icons/fa';

const ReviewCard = ({ review }: { review: Review }) => {
  const [showFullContent, setShowFullContent] = useState(false);

  let content = review.content;

  if (!showFullContent) {
    content = content.length > 77 ? content.slice(0, 77) + '...' : content;
  }

  return (
    <>
      <div className="w-full flex justify-end items-center">
        <p className="text-xs font-light italic text-gray-700">
          {format(review.created_at, 'dd-MM-yyyy hh:mm')}
        </p>
      </div>

      <div className="flex justify-start items-center gap-4 w-full">
        <FaRegUserCircle className="w-7 h-7" />

        <h3>{review.author_name}</h3>
      </div>

      <p className="text-justify text-normal ">{`"${content}"`}</p>

      <div className="w-full text-right">
        {review.content.length > 77 && (
          <button
            onClick={() => setShowFullContent((prevState) => !prevState)}
            className="text-ems-blue hover:text-ems-blue-light"
          >
            {showFullContent ? 'Less' : 'More'}
          </button>
        )}
      </div>
    </>
  );
};

export default ReviewCard;
