import { classMerge } from '@ems/common-ui';

const ReviewStatisticCard = ({
  title,
  value,
}: {
  title: string;
  value: number;
}) => {
  // todo
  const buildClassName = (path: string) => {
    return classMerge({
      'text-ems-blue': title === 'Positive',
      'text-ems-yellow': title === 'Neutral',
      'text-ems-red': title === 'Negative',
    });
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-center items-center">
      <p
        className={`text-4xl lg:text-7xl font-semibold pb-4 ${buildClassName}`}
      >
        {value}
      </p>
      <div className="w-full  flex justify-center items-center pb-4">
        <p
          className={`text-lg font-semibold uppercase tracking-wider ${buildClassName}`}
        >
          {title}
        </p>
      </div>
    </div>
  );
};

export default ReviewStatisticCard;
