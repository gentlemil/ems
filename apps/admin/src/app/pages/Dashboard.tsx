import { useQuery } from '@tanstack/react-query';

import { dashboardReviewsList, reviewsStatistics } from '../services/reviews';

import { Card, Header } from '@ems/common-ui';

import Spinner from '../components/Spinner';
import ReviewStatistics from '../components/ReviewStatistics';
import LastReviews from '../components/LastReviews';

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
    isPending: isPendingStatistics,
    error: errorStatistics,
    data: dataStatistics,
  } = useQuery({
    queryKey: ['statistics'],
    queryFn: reviewsStatistics,
  });

  const isLoading = isPendingRevs || isPendingStatistics;

  //errors
  if (errorStatistics || errorRevs) {
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

  return (
    <div className="container mx-auto px-4">
      <Header>Dashboard</Header>

      <p className="py-4 italic">
        Welcome in EMS Admin Panel. Please use the menu to navigate.
      </p>

      {isLoading ? (
        <Spinner loading={isLoading} />
      ) : (
        <div className="grid grid-cols-7 gap-4">
          <div className="col-span-5">
            <div className="pb-4">
              <ReviewStatistics statistics={dataStatistics} />
            </div>
            <div className="pb-4">
              <h2 className="text-xl font-semibold text-slate-900 my-4">
                Last Reviews
              </h2>

              <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                <LastReviews reviews={dataRevs?.reviews} />
              </ul>
            </div>
          </div>

          {/* todo: in progress when prepare more data */}
          <div className="col-span-2">
            <Card>
              <div className="h-72"></div>
            </Card>
            <Card>
              <div className="h-36"></div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};
