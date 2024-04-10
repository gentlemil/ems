'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';

import { Header } from '@ems/common-ui';

import { FaRegUserCircle } from 'react-icons/fa';

type Review = {
  id: number;
  public_id: string;
  author_name: string;
  content: string;
  is_confirmed: boolean;
  created_at: string;
};

export default function Review() {
  const [reviews, setReviews] = useState<Review[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    try {
      fetch('/api/reviews')
        .then((response) => response.json())
        .then((data: Review[]) => {
          setReviews(data);
          setIsLoading(false);
        });
    } catch (error) {
      setHasError(true);
    }
  }, [setReviews]);

  if (isLoading) {
    return <p className="text-ems-blue-light italic">Loading...</p>;
  }

  if (!reviews) {
    return <p className="text-ems-blue-light italic">No reviews...</p>;
  }

  if (!isLoading && reviews) {
    return (
      <div>
        <ul className="grid grid-cols-3 gap-4">
          {reviews.map((review) => (
            <li
              key={review.id}
              className="flex flex-col justify-start items-center gap-2 rounded-lg shadow-lg p-4"
            >
              <div className="w-full flex justify-end items-center">
                <p className="text-xs font-light italic text-gray-700">
                  {format(review.created_at, 'dd-MM-yyyy hh:mm')}
                </p>
              </div>

              <div className="flex justify-start items-center gap-4 w-full">
                <FaRegUserCircle className="w-7 h-7" />

                <h3>{review.author_name}</h3>
              </div>
              <p className="text-justify text-normal ">{`"${review.content}"`}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
