import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

import { FaRegUserCircle } from 'react-icons/fa';

import { dashboardReviewsList, reviewsStats } from '../services/reviews';
import { Card, Header } from '@ems/common-ui';

export const DashboardPage = () => {
  const {
    isPending: isPendingRevs,
    error: errorRevs,
    data: dataRevs,
  } = useQuery({
    queryKey: ['reviews'],
    queryFn: dashboardReviewsList,
  });
  const {
    isPending: isPendingStats,
    error: errorStats,
    data: dataStats,
  } = useQuery({
    queryKey: ['stats'],
    queryFn: reviewsStats,
  });

  // skeleton
  if (isPendingStats || isPendingRevs) {
    return (
      <div className="container mx-auto px-4">
        <Header>Dashboard</Header>

        <p className="py-4 italic">
          Welcome in EMS Admin Panel. Please use the menu to navigate.
        </p>

        <div className="pb-4">
          <h2 className="text-xl font-semibold text-slate-900 my-4">
            Review Statistics
          </h2>

          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card ratio="square" key={1}>
              <div></div>
            </Card>
            <Card ratio="square" key={2}>
              <div></div>
            </Card>
            <Card ratio="square" key={3}>
              <div></div>
            </Card>
          </ul>
        </div>

        <div className="pb-4">
          <h2 className="text-xl font-semibold text-slate-900 my-4">
            Last Reviews
          </h2>

          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card key={1}>
              <div className="h-40"></div>
            </Card>
            <Card key={2}>
              <div className="h-40"></div>
            </Card>
            <Card key={3}>
              <div className="h-40"></div>
            </Card>
          </ul>
        </div>
      </div>
    );
  }

  //errors
  if (errorStats || errorRevs) {
    return (
      <div className="w-full h-screen bg-gradient-ems py-20">
        <div className="mx-auto text-8xl w-full text-center text-gray-100">
          404
        </div>
        <div className="mx-auto text-xl w-full text-center text-gray-100">
          Refresh Page
        </div>
      </div>
    );
  }

  // ok
  return (
    <div className="container mx-auto px-4">
      <Header>Dashboard</Header>

      <p className="py-4 italic">
        Welcome in EMS Admin Panel. Please use the menu to navigate.
      </p>

      <div className="pb-4">
        <h2 className="text-xl font-semibold text-slate-900 my-4">
          Review Statistics
        </h2>

        {dataStats.stats && dataStats.stats.total && (
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card ratio="square" key={1}>
              <div className="relative w-full h-full flex justify-center items-center">
                <p className="text-7xl font-semibold text-ems-blue">
                  {dataStats.stats.positive}
                </p>
                <div className="w-full absolute bottom-0 flex justify-center items-center pb-4">
                  <p className="text-lg font-semibold text-ems-blue uppercase tracking-wider">
                    Positive
                  </p>
                </div>
              </div>
            </Card>
            <Card ratio="square" key={2}>
              <div className="relative w-full h-full flex justify-center items-center">
                <p className="text-7xl font-semibold text-ems-yellow">
                  {dataStats.stats.neutral}
                </p>
                <div className="w-full absolute bottom-0 flex justify-center items-center pb-4">
                  <p className="text-lg font-semibold text-ems-yellow uppercase tracking-wider">
                    Neutral
                  </p>
                </div>
              </div>
            </Card>
            <Card ratio="square" key={3}>
              <div className="relative w-full h-full flex justify-center items-center">
                <p className="text-7xl font-semibold text-ems-red">
                  {dataStats.stats.negative}
                </p>
                <div className="w-full absolute bottom-0 flex justify-center items-center pb-4">
                  <p className="text-lg font-semibold text-ems-red uppercase tracking-wider">
                    Negative
                  </p>
                </div>
              </div>
            </Card>
          </ul>
        )}
      </div>

      <div className="pb-4">
        <h2 className="text-xl font-semibold text-slate-900 my-4">
          Last Reviews
        </h2>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {dataRevs?.reviews &&
            dataRevs.reviews.map((review, index) => (
              <Card key={index}>
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
              </Card>
            ))}
        </ul>
      </div>
    </div>
  );
};
