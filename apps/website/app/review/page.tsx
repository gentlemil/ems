import { Header } from '@ems/common-ui';
import db from '@ems/prisma-client';
import { format } from 'date-fns';

export default async function Review() {
  const reviews = await db.review.findMany({
    where: { is_confirmed: true },
    orderBy: { created_at: 'desc' },
  });

  return (
    <div>
      <Header>Reviews</Header>
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
              <svg
                width="24"
                height="24"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Profil" clip-path="url(#clip0_327_38463)">
                  <path
                    id="Vector"
                    d="M9 0C4.02975 0 0 4.02975 0 9C0 13.9703 4.02975 18 9 18C13.9703 18 18 13.9703 18 9C18 4.02975 13.9703 0 9 0ZM14.8148 13.7288C14.619 13.2893 14.223 12.9855 13.4115 12.798C11.6917 12.4012 10.0905 12.0533 10.8668 10.5893C13.2255 6.13275 11.4915 3.75 9 3.75C6.459 3.75 4.767 6.22425 7.13325 10.5893C7.93275 12.0623 6.27225 12.4095 4.5885 12.798C3.7755 12.9855 3.3825 13.2915 3.18825 13.7325C2.1345 12.4402 1.5 10.7933 1.5 9C1.5 4.8645 4.8645 1.5 9 1.5C13.1355 1.5 16.5 4.8645 16.5 9C16.5 10.7917 15.8663 12.4373 14.8148 13.7288Z"
                    fill="currentColor"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_327_38463">
                    <rect width="18" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <h3>{review.author_name}</h3>
            </div>
            <p className="text-justify text-normal ">{`"${review.content}"`}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
