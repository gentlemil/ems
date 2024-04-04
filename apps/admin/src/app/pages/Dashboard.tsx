import { useQuery } from '@tanstack/react-query';
import { reviewsList } from '../services/reviews';
import { Button, Header } from '@ems/common-ui';

export const DashboardPage = () => {
  const { data, error, isLoading } = useQuery({
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

  return (
    <div>
      <Header>Dashboard</Header>
      <div>
        {data?.reviews &&
          data.reviews.map((review) => (
            <div key={review.id}>
              <p>{review.author_name}</p>
              <p>{review.content}</p>
              <Button label="Confirm"></Button>
              <Button label="Remove"></Button>
            </div>
          ))}
      </div>
    </div>
  );
};
