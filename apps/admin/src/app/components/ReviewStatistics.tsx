import { Card } from '@ems/common-ui';

const ReviewStatistics = ({ statistics }: { statistics: any }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-900 my-4">
        Review Statistics
      </h2>

      {statistics && statistics.total && (
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card ratio="video" key={1}>
            <div className="relative w-full h-full flex justify-center items-center">
              <p className="text-7xl font-semibold text-ems-blue">
                {statistics.positive}
              </p>
              <div className="w-full absolute bottom-0 flex justify-center items-center pb-4">
                <p className="text-lg font-semibold text-ems-blue uppercase tracking-wider">
                  Positive
                </p>
              </div>
            </div>
          </Card>
          <Card ratio="video" key={2}>
            <div className="relative w-full h-full flex justify-center items-center">
              <p className="text-7xl font-semibold text-ems-yellow">
                {statistics.neutral}
              </p>
              <div className="w-full absolute bottom-0 flex justify-center items-center pb-4">
                <p className="text-lg font-semibold text-ems-yellow uppercase tracking-wider">
                  Neutral
                </p>
              </div>
            </div>
          </Card>
          <Card ratio="video" key={3}>
            <div className="relative w-full h-full flex justify-center items-center">
              <p className="text-7xl font-semibold text-ems-red">
                {statistics.negative}
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
  );
};

export default ReviewStatistics;
